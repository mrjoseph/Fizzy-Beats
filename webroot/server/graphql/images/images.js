import { gql } from 'apollo-server-express';


export const typeDefs = gql`
  type Image {
    id: ID
    status: String
    userId: String
    message: String
    file: FileInput
  }

  type ImageFileInput {
    name: String,
    size: Int,
    type: String,
  }

  input ImageFile {
    name: String,
    size: Int,
    type: String,
  }

  extend type Query{
    getImage(userId: String): [Image]
  }

  extend type Mutation {
    addImage(
      userId: String!
      message: String
      file: [ImageFile]!
      ): Assets
  }
`;


export const resolvers = {
  Query: {
    getImage: async (parent, { userId }, { Assets }) => {
      const result = await Assets.find({ userId: userId });
      return result;
    }
  },
  Mutation: {
    addImage: async (parent, { userId, file }, { Images, User }) => {
      await User.findOneAndUpdate({ _id: userId }, {profileImage:`/${file[0].name}`});      
        return {
          message: 'image saved!'
        }
    },
  },
};
