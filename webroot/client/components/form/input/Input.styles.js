import styled from 'styled-components';

export const Label = styled.label`    
  position: relative;
    display: block;
    `;

export const Span = styled.span`    
      color: #35dc9b;
      font: 13px Helvetica, Arial, sans-serif;
      position: absolute;
      top: 0px;
      left: 20px;
      opacity: 0;
      transition: all 0.2s ease-in-out;
  `;


export const InputStyled = styled.input`
    border: 1px solid ${props => props.theme.error};
    font: 18px Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    display: block;
    padding: 18px;
    width: 300px;
    margin-bottom: 20px;
    font-size: 18px;
    outline: none;
    transition: all 0.2s ease-in-out;
  
  &::placeholder {
      transition: all 0.2s ease-in-out;
      color: #999;
      font: 18px Helvetica, Arial, sans-serif;
    }
  &:focus + span {
     opacity: 1;
     top: 10px;
 }
  &:focus, &.populated {
      padding-top: 26px;
      padding-bottom: 10px;
  
    &::placeholder {
        color: transparent;
      }
    }
  }
`;
