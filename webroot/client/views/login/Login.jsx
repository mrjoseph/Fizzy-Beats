import React, { Component } from 'react';
import './login.css';
import { Title } from '../../styledComponents/index.styles';
import LoginForm from '../../components/form/loginForm';

class Login extends Component {
  render() {
    return (
      <div className="container">
        <Title>Login</Title>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
