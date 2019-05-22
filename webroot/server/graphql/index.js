import { gql, ApolloServer } from 'apollo-server-express';
import fs from 'fs';
import { typeDefs as profileTypeDefs, resolvers as profileResolvers } from './profile/profile';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user/user';
import { typeDefs as assetsTypeDefs, resolvers as assetsResolvers } from './assets/assets';
import Tracks from './track/tracksModel';
import User from './user/userModel';
import Assets from './assets/assetsModel';

const pngToJpeg = require('png-to-jpeg');
const { GraphQLServer } = require('graphql-yoga');
const { createWriteStream } = require('fs');


export const s3Resolver = {
  Mutation: {
    signS3: async () => {
      // add file to database
    }
  },
  Query:{
    url: () => 'http://localhost:3003/upload',
  }
}



const storeUpload = ({ stream, filename, userId }) => new Promise((resolve, reject) => stream
  .pipe(createWriteStream(`./webroot/client/assets/${userId}/${filename}`))
  .on('finish', () => resolve())
  .on('error', reject));

const context = {
  Tracks,
  User,
  Assets
};


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
export const typeDefs = [linkSchema, profileTypeDefs, userTypeDefs, assetsTypeDefs];
const server = new ApolloServer({
  typeDefs,
  resolvers: [profileResolvers, userResolvers, assetsResolvers],
  context,
});

export default server;
