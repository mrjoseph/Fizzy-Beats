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
    profileImage: String
    profileUsername: String
    assets: [Assets!]!
    defaults: Defaults!
  }
    extend type Query{
      profiles: [Profile!]
      profile(profileUsername: String): Profile
      profileId(id: ID): Profile
  }
`;

export const resolvers = {
  Query: {
    profile: async (parent, { profileUsername }, { User }) => await User.findOne({ profileUsername }),
    profileId: async (parent, { id }, { User }) => await User.findById(id),
    profiles: (parent, args, { User }) => User.find({}),
  },
  Profile: {
    assets: async ({_id}, args, { Assets }) => await Assets.find({ userId: _id}),
    defaults: () => ({ cdn: process.env.CDN })
  },
};
