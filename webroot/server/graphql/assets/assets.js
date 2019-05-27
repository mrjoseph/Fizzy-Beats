import { gql } from 'apollo-server-express';


export const typeDefs = gql`
  type Assets {
    id: ID
    userId: String
    message: String
    files: [FileInput]!
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
    getAsset(userId: String): Assets
  }

  extend type Mutation {
    addAssets(
      userId: String!
      message: String
      files: [File]!
      ): Assets
  }
`;


export const resolvers = {
  Query: {
    getAssets: async (parent, args, { Assets }) => Assets.find({}),
    getAsset: async (parent, { userId }, { Assets }) => {
      return Assets.findOne({userId});
    },

  },
  Mutation: {
    addAssets: async (parent, obj, { Assets }) => {
      const { userId, files } = obj; 
      const currentAssets = await Assets.findOne({userId});
      if(userId && currentAssets !== null) {
        const query = {userId: userId}
        await Assets.findOneAndUpdate(query, { $set: { files: [...files, ...currentAssets.files] }})
       
        return {
          userId,
          files,
          message: 'assets have been updated!'
        }
      } else {
        const assets = new Assets({ userId, files });
        assets.save();
        return {
          userId,
          files,
          message: 'assets saved!'
        }
      }
    },
  },
};
