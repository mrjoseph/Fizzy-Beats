import styled from 'styled-components';

export const ProfileImageCropArea = styled.div`
  width: ${props => props.theme.width};
  margin: 0 auto;
  img {
    width:100%;
    border-radius:50px
  }
`;
ProfileImageCropArea.defaultProps = {
  theme: {
    width: '300px',
  },
};
