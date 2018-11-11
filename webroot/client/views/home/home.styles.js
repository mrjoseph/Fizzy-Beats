import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  width:70%;
  margin:0 auto;
  text-align:centre;
`;

export const Title = styled.h1({
  color: 'palevioletred',
  'font-size': '1em',
  margin:'1em',
  padding: '0.25em 1em',
  'text-align': 'center',
});

export const Box = styled.div({
  'border-bottom': "1px solid #ccc",
  width:"70%",
  margin: '0 auto'
});