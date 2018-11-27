import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../AuthService/AuthService';
import Input from '../../components/Form/input/Input';

const USERNAME = [
  {
    text: 'username',
    name: 'username',
    type: 'text',
  },
];

const PASSWORD = [
  {
    text: 'password',
    name: 'password',
    type: 'password',
  },
];
const EMAIL = [
  {
    text: 'email',
    name: 'email',
    type: 'text',
  },
];

const LOGIN = [USERNAME, EMAIL, PASSWORD];


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      // confirmPassword: '',
      email: '',
      status: null,
      formErrors: { username: '', email: '', password: '' },
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.Auth = new AuthService();
  }

  validate(fieldName, value) {
    let validUsername;
    let validEmail;
    let validPassword;
    switch (fieldName) {
      case 'username':
        validUsername = value.match(/[a-z]{3}/);
        if (Array.isArray(validUsername)) {
          this.setState({
            usernameValid: true,
            formErrors: { username: '' },
          });
        } else {
          this.setState({
            usernameValid: false,
            formErrors: { username: 'empty username' },
          });
        }
        break;
      case 'email':
        validEmail = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        if (Array.isArray(validEmail)) {
          this.setState({
            emailValid: true,
            formErrors: { email: '' },
          });
        } else {
          this.setState({
            emailValid: false,
            formErrors: { email: 'is invalid' },
          });
        }
        break;
      case 'password':
        validPassword = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/i);
        if (Array.isArray(validPassword)) {
          this.setState({
            passwordValid: true,
            formErrors: { password: '' },
          });
        } else {
          this.setState({
            passwordValid: false,
            formErrors: { password: 'password invalid' },
          });
        }
        break;
      default:
        break;
    }
  }

  handleBlur(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => this.validate(name, value));
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => this.validate(name, value));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addUser } = this.props;
    this.Auth.register(addUser, this.state).then((data) => {
      this.setState({ status: data.addUser.status });
    });
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
    const { formErrors, emailValid, passwordValid } = this.state;
    return (
      <div>
        <h1>Register...</h1>
        {this.state.status && (<div>{this.state.status}</div>)}
        <form id="form" onSubmit={e => this.handleSubmit(e)}>
          {LOGIN.map(elements => elements.map(props => (
            <Input
              formErrors={formErrors}
              key={props.name}
              onChange={this.handleChange}
              handleBlur={this.handleBlur}
              defaultValue={this.state[props.text]}
              {...props}
            />
          )))}
          <button className="submit" disabled={(!emailValid || !passwordValid)}>Sign up</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  addUser: PropTypes.func,
};

Register.defaultProps = {
  addUser: () => {},
};

export default Register;
