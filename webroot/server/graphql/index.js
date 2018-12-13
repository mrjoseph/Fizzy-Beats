import { gql, ApolloServer } from 'apollo-server-express';

import {
  UserType, loginUserQuery, addUserMutation, loginUser, addUser,
} from './user/user';

import { getProfile, getProfileQuery, ProfileType } from './profile/profile';

export const typeDefs = gql`
  ${UserType}
  ${ProfileType}
  type Query{
    ${loginUserQuery}
    ${getProfileQuery}
  }
   type Mutation {
    ${addUserMutation}
   }
`;


const resolvers = {
  Query: {
    getProfile,
    loginUser,
  },
  Mutation: {
    addUser,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
