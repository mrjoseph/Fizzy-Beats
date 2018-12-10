import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { TrackType } from '../track/track';
import ProfileModel from './profileModel';

export const ProfileType = new GraphQLObjectType({
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
        return ProfileModel.find({ userId: parent.id });
      },
    },
  }),
});
