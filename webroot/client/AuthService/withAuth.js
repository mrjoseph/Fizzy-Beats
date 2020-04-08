import React, { Component } from 'react';
import AuthService from './AuthService';

const withAuth = AuthComponent => class AuthWrapped extends Component {
  constructor() {
    super();
    this.state = {
      user: null,

    };
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (!this.Auth.loggedIn()) {
      this.props.history.replace('/');
   } else {
      const profile = this.Auth.getProfile();
      this.setState({
        user: profile,
      });
   }
  }
  componentDidmount(){
    if (!this.Auth.loggedIn()) {
      this.props.history.replace('/');
      this.Auth.removeToken()
   }
  }
  render() {
    const { user } = this.state;
    return (<AuthComponent {...this.props} user={user && user}/>);
  }
};

export default withAuth;
