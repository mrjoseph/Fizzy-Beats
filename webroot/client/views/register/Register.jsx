import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../AuthService/AuthService';
import RegistrationForm from '../../components/form/registrationForm';
import { Title } from './Register.styles';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
    };
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  componentDidUpdate() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { status } = this.state;
    return (
      <div className="container">
        <Title>Register</Title>
        {status && (
        <div className="alert alert-primary" role="alert">
          It looks like you already have a account
        </div>
        )}
        <RegistrationForm />
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Register;
