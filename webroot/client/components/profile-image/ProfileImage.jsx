import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { ProfileImageCropArea } from './profileImage.styles';

class ProfileImage extends Component {
  getProfileImage() {
    const { userId } = this.props;
    const image = `http://localhost:3003/static/${userId}/profile-pic.jpg`;
    return image;
  }

  render() {
    const { username } = this.props;
    const theme = {
      width: '60px',
    };
    return (
      <ThemeProvider theme={theme}>
        <ProfileImageCropArea>
          <img src={this.getProfileImage()} alt={username} />
        </ProfileImageCropArea>
      </ThemeProvider>
    );
  }
}
ProfileImage.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.bool.isRequired,
};

export default ProfileImage;
