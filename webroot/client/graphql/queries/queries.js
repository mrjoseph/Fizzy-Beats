import { gql } from 'apollo-boost';

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
    id,
    username,
    email,
  }
}
`;

export const GET_USER_QUERY = gql`
{
  users {
    email
    username
    id
    password
  }
}
`;
