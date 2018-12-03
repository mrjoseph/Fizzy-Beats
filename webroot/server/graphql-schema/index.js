import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import User from '../mongoDb-models/user';
import Tracks from '../mongoDb-models/track';
import {
  userQuery, addUserMutation, removeUserMutation, UserType,
} from './user/user';
import { TrackType } from './track/track';


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    track: { // author by id
      type: TrackType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Tracks.findById(args.id);
      },
    },
    tracks: {
      type: new GraphQLList(TrackType),
      resolve: async (parent, args) => Tracks.find({}),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    user: userQuery,
  },
});

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTrack: {
      type: TrackType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const track = new Tracks({
          name: args.name,
          genre: args.genre,
          userId: args.userId,
        });
        return track.save();
      },
    },
    addUser: addUserMutation, // HANDLE USER SIGN UP
    removeUser: removeUserMutation,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
