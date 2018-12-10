import styled from 'styled-components';

export const HeaderNavContainer = styled.div`   
  transition:max-height .5s ease-in-out;
  overflow:hidden;
  &.showContent {
    max-height:600px;
     height:auto;
  }
  &.hideContent {
   max-height:0; 
  }
`;
