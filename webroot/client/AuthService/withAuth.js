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
      this.props.history.replace('/register');
    } else {
      try {
        const profile = this.Auth.getProfile();
        this.setState({
          user: profile,
        });
      } catch (err) {
        this.Auth.logout();
        this.props.history.replace('/login');
      }
    }
  }

  render() {
    if (this.state.user) {
      return (
        <AuthComponent history={this.props.history} user={this.state.user} />
      );
    }

    return null;
  }
};

export default withAuth;
