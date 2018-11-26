import gql from 'graphql-tag';

export const ADD_USER_MUTATION = gql`
mutation(
  $username: String!,
  $password: String!,
  $email: String!
  ) {
  addUser(
  username: $username, 
  password: $password, 
  email: $email
  ) {
    username,
    email,
    status
    auth
  }
}
`;
export const GET_USER_QUERY = gql`
  query User($username: String){
    user(username: $username){
      email
      username
      id
      password
      salt
    }
  }
`;


export const GET_USERS_QUERY = gql`
{
  users {
    email
    username
    id
    password
    salt
  }
}
`;
