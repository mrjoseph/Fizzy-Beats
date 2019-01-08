import { gql, ApolloServer } from 'apollo-server-express';

import { typeDefs as profileTypeDefs, resolvers as profileResolvers } from './profile/profile';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user/user';
import Tracks from './track/tracksModel';
import User from './user/userModel';

const { GraphQLServer } = require('graphql-yoga');
const { createWriteStream } = require('fs');

const uploadTypeDefs = `
  extend type Mutation {
    uploadFile(file: Upload!): Boolean
  }
  extend type Query {
    hello: String
  }
`;

const storeUpload = ({ stream, filename }) => new Promise((resolve, reject) => stream
  .pipe(createWriteStream(`images/${filename}`))
  .on('finish', () => resolve())
  .on('error', reject));

const context = {
  Tracks,
  User,
};

const uploadResolvers = {
  Mutation: {
    uploadFile: async (parent, { file, userId }) => {
      console.log(parent);
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    },
  },
  Query: {
    hello: () => 'hi',
  },
};
const linkSchema = gql`
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

const server = new ApolloServer({
  typeDefs: [linkSchema, profileTypeDefs, userTypeDefs, uploadTypeDefs],
  resolvers: [profileResolvers, userResolvers, uploadResolvers],
  context,
});

export default server;
