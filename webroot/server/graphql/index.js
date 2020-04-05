import { gql, ApolloServer } from 'apollo-server-express';
import fs from 'fs';
import { typeDefs as profileTypeDefs, resolvers as profileResolvers } from './profile/profile';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user/user';
import { typeDefs as assetsTypeDefs, resolvers as assetsResolvers } from './assets/assets';
import { typeDefs as imagesTypeDefs, resolvers as imagesResolvers } from './images/images';
import { typeDefs as defaultTypeDefs, resolvers as defaultResolvers } from './defaults/defaults';
import Tracks from './track/tracksModel';
import User from './user/userModel';
import Assets from './assets/assetsModel';
import Images from './images/imagesModel';

export const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Profile {
    _: Boolean
  }

    type Mutation {
    _: Boolean
  }
`;
export const typeDefs = [
  linkSchema,
  profileTypeDefs,
  userTypeDefs,
  assetsTypeDefs,
  imagesTypeDefs,
  defaultTypeDefs
];

export const resolvers = [
  profileResolvers,
  userResolvers,
  assetsResolvers,
  imagesResolvers,
  defaultResolvers,
];

export const context = {
  Tracks,
  User,
  Assets,
  Images
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

export default server;
