import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../AuthService/AuthService';
import RegistrationForm from '../../components/form/registrationForm';
import { Title } from '../../styledComponents/index.styles';

class Register extends Component {
  constructor(props) {
    super(props);
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
    return (
      <div className="container">
        <Title>Register</Title>
        <RegistrationForm />
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]).isRequired,
};
Register.displayName = 'Register';
export default Register;
