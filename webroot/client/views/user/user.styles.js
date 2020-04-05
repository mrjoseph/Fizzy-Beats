import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #ccc;
  width:70%;
`;
export const Jumbotron = styled.div`
position:relative;
.jumbo-image {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
  position: absolute;
  right: 0;
  margin-left: -100px;
  top: 0;
  img {
    width:100%;
  }
}
`;
export const Title = styled.h1({
  color: 'palevioletred',
  'font-size': '1em',
  margin:'1em',
  padding: '0.25em 1em',
});

export const Box = styled.div({
  border: "1px solid #ccc",
  width:"70%",
  margin: '0 auto'
});