import jsonwebtoken from 'jsonwebtoken';


import User from './userModel';
import { slatHashPassword, unHashPassword } from '../../utils/encription';

export const UserType = `
  type User {
    id: ID
    username: String
    email: String
    salt: String
    password: String
    status: String
    auth: String
  }
`;

export const loginUserQuery = `
  loginUser(
    email: String,
    password: String,
    status: String,
    auth: String
  ): User
`;

export const addUserMutation = `
  addUser(username: String, email: String, password: String): User
`;

export const loginUser = async (parent, args) => { // --> LOGIN
  const error = { status: 'INCORRECT_USERNAME_OR_PASSWORD' };
  const errorNoUser = { status: 'NO_USER_FOUND' };
  const user = await User.findOne({ email: args.email });
  if (!user) {
    return errorNoUser;
  }
  const {
    username,
    email: storedEmail,
    salt,
    password: storedPassword,
    id,
  } = user;
  const passwordHash = unHashPassword(args.password, salt);
  if (storedPassword === passwordHash && storedEmail === args.email) {
    const auth = jsonwebtoken.sign({
      username: user.username,
      id: user.id,
      email: user.email,
    },
    'my_secret_jwt',
    { expiresIn: '1y' });
    return {
      auth,
      status: 'SUCCESS',
      username,
      email: args.email,
      id,
    };
  }
  return error;
};

export const addUser = async (parent, args) => {
  const { passwordHash, salt } = slatHashPassword(args.password);
  const user = new User({
    username: args.username,
    email: args.email,
    salt,
    password: passwordHash,
  });
  const existingUser = await User.findOne({ email: args.email });
  if (existingUser) {
    return { status: 'USER_EXISTS' };
  }
  user.save();
  const auth = jsonwebtoken.sign({
    username: user.username,
    id: user.id,
    email: user.email,
  },
  'my_secret_jwt',
  { expiresIn: '1y' });
  return {
    auth,
    username: args.username,
    email: args.email,
    status: 'SUCCESS',
  };
};
