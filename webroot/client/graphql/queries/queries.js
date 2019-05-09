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
export const LOGIN_QUERY = gql`
  query
    (
      $email: String, $password: String
    ){
    loginUser(email: $email,password: $password){
      auth,
      email
      username
      id
      status
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query ($id: ID){
      profile(id:$id){
      username
      email
      profileImage
      track{
        name
        genre
        id
      }
    }
  }
`;
