import { gql, ApolloServer } from 'apollo-server-express';
import fs from 'fs';
import { typeDefs as profileTypeDefs, resolvers as profileResolvers } from './profile/profile';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user/user';
import Tracks from './track/tracksModel';
import User from './user/userModel';

const pngToJpeg = require('png-to-jpeg');
const { GraphQLServer } = require('graphql-yoga');
const { createWriteStream } = require('fs');

const uploadTypeDefs = `
  extend type Mutation {
    uploadFile(file: Upload!, userId: String!): Boolean
  }
  extend type Query {
    hello: String
  }
`;

const storeUpload = ({ stream, filename, userId }) => new Promise((resolve, reject) => stream
  .pipe(createWriteStream(`./webroot/client/assets/${userId}/${filename}`))
  .on('finish', () => resolve())
  .on('error', reject));

const context = {
  Tracks,
  User,
};

const uploadResolvers = {
  Mutation: {
    uploadFile: async (parent, { file, userId }) => {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename, userId });
      const buffer = fs.readFileSync(`./webroot/client/assets/${userId}/${filename}`);
      pngToJpeg({ quality: 90 })(buffer)
        .then(output => fs.writeFileSync(`./webroot/client/assets/${userId}/profile-pic.jpg`, output));
      fs.unlinkSync(`./webroot/client/assets/${userId}/${filename}`);
      return true;
    },
  },
  Query: {
    hello: () => 'Upload to Node JS',
  },
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
export const typeDefs = [linkSchema, profileTypeDefs, userTypeDefs, uploadTypeDefs];
const server = new ApolloServer({
  typeDefs,
  resolvers: [profileResolvers, userResolvers, uploadResolvers],
  context,
});

export default server;
