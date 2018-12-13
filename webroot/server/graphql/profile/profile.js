import User from '../user/userModel';

export const ProfileType = `
   type ProfileType {
    id: ID
    username: String
    email: String
    salt: String
    password: String
    status: String
    auth: String
  }
`;

export const getProfileQuery = `
    getProfile(
    email: String,
    password: String,
    status: String,
    auth: String
    ): ProfileType
`;


export const getProfile = async (parent, args) => { // --> LOGIN
  return User.findOne({ email: args.email });
};
