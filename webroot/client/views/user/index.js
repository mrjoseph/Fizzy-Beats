import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import withAuth from '../../AuthService/withAuth';
import User from './user';
import { graphql, compose } from 'react-apollo';


export const GET_USERS_PROFILE_QUERY = gql`
  query ($profileUsername: String){
      profile(profileUsername:$profileUsername){
      username
      id
      email
      profileImage
      assets{
          id
          status
        file{
          name
          size
          type
        }
      }
    }
  }
`;

export default withRouter(withAuth(compose(
    graphql(GET_USERS_PROFILE_QUERY, {
      name: 'data',
      options: (props) => {
          return {
            variables: {
                profileUsername: props.history.location && props.history.location.pathname,
            },
          }
      },
    })
  )(User)));
