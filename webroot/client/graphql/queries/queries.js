import gql from 'graphql-tag';
export const GET_DEFAULTS_QUERY = gql`
query {
  getDefaults {
    cdn
  }
}
`;
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
      profileUsername
      profileImage
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query ($id: ID){
    profileId(id: $id){
      username
      email
      profileImage
      defaults{
        cdn
      }
      assets{
        file{
          name
          size
          type
        }
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
query{
	profiles {
    username
    id
    profileUsername
  }
}
`;

export const GET_TEXT_COLOR = gql`{
  textColor @client {
    value
  }
}`;
export const SET_TEXT_COLOR = gql`
mutation setTextColor($color: Boolean) {
  setTextColor(color: $color) @client {
    textColor
  }
}
`;

export const PLAY_AUDIO = gql`{
  audio @client {
    name
    userId
    id
  }
}`;

export const GET_TOGGLE_AUDIO_QUERY = gql`{
  toggleAudio @client {
    id
    status
    toggle
    assetsId
  }
}`;
export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

export const TOGGLE_AUDIO_MUTATION = gql`
mutation toggleAudio($id: Int!, $status: String, $toggle: Boolean, $assetsId: String ) {
  toggleAudio(id: $id, status: $status, toggle: $toggle, assetsId: $assetsId) @client
}
`;

export const PLAY_AUDIO_MUTATION = gql`
mutation playAudio($name: String, $userId: String, $id: String) {
  playAudio(name: $name, userId: $userId, id: $id) @client {
    audio
  }
}
`;