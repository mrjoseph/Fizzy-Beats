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
       @media only screen and (min-width: 991px) {
        max-height:600px;
        
    }
  }
  
  @media only screen and (min-width: 991px) {
  transition:max-height .5s ease-in-out;
      max-height:600px;
     height:auto;
  
}
`;


const foo = `
  &.showContent {
    max-height:600px;
     height:auto;
  }
 
`;
