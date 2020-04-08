import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { ProfileImageCropArea } from './profileImage.styles';



const ProfileImage = ({ username, profileImage, id}) => {
  const profileImageURL =
  `http://localhost:3003/static/${id}${profileImage}`;
  const theme = {
    width: '40px',
  };
  return (
    <ThemeProvider theme={theme}>
      <ProfileImageCropArea>
        <img src={profileImageURL} alt={username} />
      </ProfileImageCropArea>
    </ThemeProvider>
  );
};
ProfileImage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileImage;
