import jsonwebtoken from 'jsonwebtoken';
import { slatHashPassword } from '../../utils/encription';
const graphql = require('graphql');
const User = require('../../mongoDb-models/user');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

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
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    user: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ username: args.username });
        return user;
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // HANDLE USER SIGN UP
    addUser: {
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
        const auth = jsonwebtoken.sign({ username: user.username, id: user.id, email: user.email },
          'my_secret_jwt',
          { expiresIn: '1y' });
        return {
          auth,
          username: args.username,
          email: args.email,
          status: 'SUCCESS',
        };
      },
    },
    removeUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
