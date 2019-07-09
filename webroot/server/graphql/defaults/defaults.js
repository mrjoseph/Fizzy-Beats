import { gql } from 'apollo-server-express';

const cdn = process.env.CDN;

export const typeDefs = gql`
  type Defaults {
    cdn: String
  }

  extend type Query{
    getDefaults: Defaults!

  }
`;

export const resolvers = {
  Query: {
    getDefaults: (parent, args, context) => ({ cdn })
  },
};
