import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../AuthService/AuthService';
import Input from '../../components/form/input/Input';
import { Form, Title } from './Register.styles';
import validation from '../../components/form/validation/validation';


const USERNAME = [
  { Component: Input,
    text: 'username',
    name: 'username',
    type: 'text',
  },
];

const PASSWORD = [
  {
    Component: Input,
    text: 'password',
    name: 'password',
    type: 'password',
  },
];
const EMAIL = [
  {
    Component: Input,
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

  handleBlur(e) {
    const { formErrors } = this.state;
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => {
      this.setState(validation(name, value, formErrors))
    });
  }

  handleChange(e) {
    const { formErrors } = this.state;
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => {
      this.setState(validation(name, value, formErrors))
    });
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
    const {
      formErrors, emailValid, passwordValid, status, usernameValid,
    } = this.state;
    return (
      <div className="container">
        <Title>Register</Title>
        {status && (
        <div className="alert alert-primary" role="alert">
          It looks like you already have a account
        </div>
        )}
        <Form id="form" onSubmit={this.handleSubmit}>
          {LOGIN.map(elements => elements.map(props => {
            const { Component, ...rest } = props;
            return (
                <Component
                    formErrors={formErrors}
                    key={props.name}
                    onChange={this.handleChange}
                    handleBlur={this.handleBlur}
                    {...rest}
                />
            )
          }))}
          <button
            className={`submit btn ${(emailValid && passwordValid && usernameValid) ? 'btn-success' : 'btn-secondary'}`}
            type="submit"
            disabled={(!emailValid || !passwordValid || !usernameValid)}
          >
            Sign up
          </button>
        </Form>
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
