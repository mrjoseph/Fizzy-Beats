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
    const { getProfile: { email, username } } = data;
    return (
      <div>
        <div>{email}</div>
        <div>{username}</div>
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
      email: props.user && props.user.email,
    },
  }),
})(Profile));
