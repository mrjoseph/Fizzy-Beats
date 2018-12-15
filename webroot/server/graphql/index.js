import { gql, ApolloServer } from 'apollo-server-express';

import { typeDefs as profileTypeDefs, resolvers as profileResolvers } from './profile/profile';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user/user';
import Tracks from './track/tracksModel';
import User from './user/userModel';

const context = {
  Tracks,
  User,
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
  typeDefs: [linkSchema, profileTypeDefs, userTypeDefs],
  resolvers: [profileResolvers, userResolvers],
  context,
});

export default server;
