import { gql } from 'apollo-server-express';


export const typeDefs = gql`
  type Assets {
    id: ID
    status: String
    userId: String
    message: String
    file: FileInput
  }

  type FileInput {
    name: String,
    size: Int,
    type: String,
  }

  input File {
    name: String,
    size: Int,
    type: String,
  }

  extend type Query{
    getAssets: [Assets!]
    getAsset(userId: String): [Assets]
  }

  extend type Mutation {
    addAssets(
      userId: String!
      message: String
      file: [File]!
      ): Assets
  }
`;


export const resolvers = {
  Query: {
    getAssets: async (parent, args, { Assets }) => {
      const result = await Assets.find({});
      console.log(result);
      return await result;
    },
    getAsset: async (parent, { userId }, { Assets }) => {
      const result = await Assets.find({ userId: userId });
      console.log(result);
      return result;
    }
  },
  Mutation: {
    addAssets: async (parent, { userId, file }, { Assets }) => {
        file.map((file) => {
          const assets = new Assets({ userId, status: 'pending', file });
          assets.save();
        });       
        return {
          message: 'assets saved!'
        }
    },
  },
};
