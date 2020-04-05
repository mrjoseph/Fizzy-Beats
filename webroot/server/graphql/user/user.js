import jsonwebtoken from 'jsonwebtoken';
import { gql } from 'apollo-server-express';
import axios from 'axios';
import { slatHashPassword, unHashPassword } from '../../utils/encription';

export const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    salt: String
    password: String
    status: String
    auth: String
    profileUsername: String
    profileImage: String
    assets: [Assets]
    defaults: Defaults
  }
   extend type Query {
     loginUser(
        email: String,
        password: String,
        status: String,
        auth: String
        profileImage: String
        profileUsername: String
      ): User
   }
   extend type Query{
    getAllUsers: [User!]
    getUser(id: ID): User!
  }

    extend type Mutation {
     addUser(
        username: String,
        email: String,
        password: String
      ): User
   }
`;


export const resolvers = {
  User: {
    assets: async ({_id}, args, { Assets }) => 
    await Assets.find({ userId: _id})
  },
  Query: {
    getUser: async (parent, { id }, { User }) => {
      return await User.findById(id);
    },
    getAllUsers: async (parent, args, { User }) => {
      return await User.find({});
    },
    loginUser: async (parent, { email, password }, { User }) => {
      const error = { status: 'INCORRECT_USERNAME_OR_PASSWORD' };
      const errorNoUser = { status: 'NO_USER_FOUND' };
      const user = await User.findOne({ email });
      if (!user) {
        return errorNoUser;
      }
      const {
        username,
        email: storedEmail,
        salt,
        password: storedPassword,
        id,
        profileUsername,
        profileImage,
        defaults
      } = user;
  
      const passwordHash = unHashPassword(password, salt);
      if (storedPassword === passwordHash && storedEmail === email) {
        const auth = jsonwebtoken.sign({
          username: user.username,
          id: user.id,
          email: user.email,
          profileUsername: user.profileUsername,
          profileImage: user.profileImage,
          defaults: user.defaults
        },
        'my_secret_jwt',
        { expiresIn: 100 });
        return {
          auth,
          status: 'SUCCESS',
          username,
          email,
          id,
          profileImage,
          profileUsername,
          defaults
        };
      }
      return error;
    },

  },
  Mutation: {
    addUser: async (parent, { username, email, password }, { User }) => {
      const profileUsername = `/${username.replace(/\s/g,'').toLowerCase()}`;
 
      const { passwordHash, salt } = slatHashPassword(password);
      const user = new User({
        username,
        email,
        salt,
        password: passwordHash,
        profileImage: '/default-profile-pic.jpg',
        profileUsername: profileUsername,
      });
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { status: 'USER_EXISTS' };
      }
      try {
        await user.save();
        axios.post('http://localhost:3003/create-storage', {
          userId: user.id,
        })
     
        const auth = jsonwebtoken.sign({
          username: user.username,
          id: user.id,
          email: user.email,
          profileUsername: user.profileUsername,
          profileImage: user.profileImage
        },
        'my_secret_jwt',
        { expiresIn: '1y' });

        return {
          auth,
          username,
          email,
          status: 'SUCCESS',
          profileUsername: user.profileUsername,
          profileImage: user.profileImage
        };

      } catch (error) {
        console.log(error.message);
      }
    },
  },
};


