import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ProfileImageCropArea } from './profileImage.styles';

import { GET_USERS_QUERY } from '../../graphql/queries/queries';
class ProfileImage extends Component {
  render() {
    
    const { username, data, userId } = this.props;
    const theme = {
      width: '40px',
    };
    const { loading, error, profileId } = data;
    if(loading) return <div>loading</div>
    if(error) return <div>error</div>
    const profileImageURL =
    `http://localhost:3003/static/${userId}${profileId.profileImage}`;


    return (
      <ThemeProvider theme={theme}>
        <ProfileImageCropArea>
          <img src={profileImageURL} alt={username} />
        </ProfileImageCropArea>
      </ThemeProvider>
    );

  }
}
ProfileImage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default graphql(GET_USERS_QUERY, {
  name: 'data',
  options: (props) => {
    return {
      variables: {
        id: props.userId,
      },
    }
  },
})(ProfileImage);

