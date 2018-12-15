import { gql } from 'apollo-server-express';

export const typeDefs = gql`
   extend type Profile {
    id: ID
    username: String
    email: String
    salt: String
    password: String
    status: String
    auth: String
    track: [Track!]!
  }
    extend type Query{
    profiles: [Profile!]
      profile(id: ID): Profile
  }
    type Track {
    id: ID!
    name: String!
    genre:  String!
    profile: Profile!
  }
`;

export const resolvers = {
  Query: {
    profile: async (parent, { id }, { User }) => User.findById(id),
    profiles: (parent, args, { User }) => User.find({}),
  },
  Profile: {
    track: ({ id }, args, { Tracks }) => Tracks.find({ userId: id }),
  },
};
