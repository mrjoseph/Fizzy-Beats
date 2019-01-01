import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import withAuth from '../../AuthService/withAuth';
import { Title } from '../../styledComponents/index.styles';
import { GET_USERS_QUERY } from '../../graphql/queries/queries';

class Profile extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) return 'Loading...';
    if (data.error) return 'Error...';
    const { profile: { email, username, track } } = data;
    return (
      <div className="container">
        <div>{email}</div>
        <div>{username}</div>
        <div>
          {
          track && track.map(({ name, genre, id }) => (
            <div key={id}>
              <div>
                name:
                {name}
              </div>
              <div>
                genre:
                {genre}
              </div>
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {};

Profile.defaultProps = {
  pathname: '',
};

export default withAuth(graphql(GET_USERS_QUERY, {
  options: props => ({
    name: 'userData',
    variables: {
      id: props.user && props.user.id,
    },
  }),
})(Profile));
