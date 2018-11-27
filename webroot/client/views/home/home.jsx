import React, { Component } from 'react';
import './home.css';
import withAuth from '../../AuthService/withAuth';
// import { Container, Title, Box } from './home.styles';

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <h1> Welcome {user && `${user.username.toUpperCase()}`}</h1>
    );
  }
}

export default Home;
