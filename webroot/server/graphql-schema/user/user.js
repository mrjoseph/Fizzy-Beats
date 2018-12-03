import jsonwebtoken from 'jsonwebtoken';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import { TrackType } from '../track/track';
import Tracks from '../../mongoDb-models/track';

import { slatHashPassword, unHashPassword } from '../../utils/encription';
import User from '../../mongoDb-models/user';

// ---------------------------------- TYPES
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    salt: { type: GraphQLString },
    password: { type: GraphQLString },
    status: { type: GraphQLString },
    auth: { type: GraphQLString },
    tracks: {
      type: new GraphQLList(TrackType),
      resolve(parent) {
        return Tracks.find({ userId: parent.id });
      },
    },
  }),
});

// ---------------------------------> QUERY
export const userQuery = { // ------> LOGIN
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    status: { type: GraphQLString },
    auth: { type: GraphQLString },
  },
  resolve: async (parent, args) => { // --> LOGIN
    const error = { status: 'INCORRECT_USERNAME_OR_PASSWORD' };
    const errorNoUser = { status: 'NO_USER_FOUND' };
    const user = await User.findOne({ email: args.email });
    if (!user) {
      return errorNoUser;
    }
    const {
      username,
      email: storedEmail,
      salt,
      password: storedPassword,
      id,
    } = user;
    const passwordHash = unHashPassword(args.password, salt);
    if (storedPassword === passwordHash && storedEmail === args.email) {
      const auth = jsonwebtoken.sign({
        username: user.username,
        id: user.id,
        email: user.email,
      },
      'my_secret_jwt',
      { expiresIn: '1y' });
      return {
        auth,
        status: 'SUCCESS',
        username,
        email: args.email,
        id,
      };
    }
    return error;
  },
};

// ---------------------------------> MUTATIONS
export const addUserMutation = { // > REGISTER
  type: UserType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    status: { type: GraphQLString },
    auth: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { passwordHash, salt } = slatHashPassword(args.password);
    const user = new User({
      username: args.username,
      email: args.email,
      salt,
      password: passwordHash,
    });
    const existingUser = await User.findOne({ email: args.email });
    if (existingUser) {
      return { status: 'USER_EXISTS' };
    }
    user.save();
    const auth = jsonwebtoken.sign({
      username: user.username,
      id: user.id,
      email: user.email,
    },
    'my_secret_jwt',
    { expiresIn: '1y' });
    return {
      auth,
      username: args.username,
      email: args.email,
      status: 'SUCCESS',
    };
  },
};

export const removeUserMutation = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findByIdAndRemove(args.id);
  },
};
