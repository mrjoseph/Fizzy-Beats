import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import _ from 'lodash';
import validation from '../validation/validation';
import { Form } from '../../../views/register/Register.styles';
import AuthService from '../../../AuthService/AuthService';
import { LOGIN } from '../formConfig/formConfig';
import { SubmitButton } from '../submitButton/SubmitButton';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      status: null,
      formErrors: {},
    };
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.submitDisabled = this.submitDisabled.bind(this);
  }

  handleBlur(e) {
    const { formErrors } = this.state;
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => {
      this.setState(validation(name, value, formErrors));
    });
  }

  handleChange(e) {
    const { formErrors } = this.state;
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => {
      this.setState(validation(name, value, formErrors));
    });
  }

  handleSubmit(e) {
    const { client, history } = this.props;
    e.preventDefault();
    this.Auth.login(client, this.state).then((data) => {
      if (data.loginUser.status === 'SUCCESS') {
        history.replace('/profile');
      } else {
        this.setState({ status: data.loginUser.status });
      }
    });
  }

  submitDisabled() {
    const password = _.get(this.state.formErrors, 'password.valid', false);
    const email = _.get(this.state.formErrors, 'email.valid', false);
    return (!password || !email);
  }

  render() {
    const { formErrors, status } = this.state;
    return (
      <div>
        {status && (
          <div className="alert alert-primary" role="alert">
            {status}
          </div>
        )}
        <Form id="form" onSubmit={this.handleSubmit}>
          {LOGIN.map(elements => elements.map((props) => {
            const { Components, ...rest } = props;
            return (
              <Components
                formErrors={formErrors}
                key={props.name}
                onChange={this.handleChange}
                handleBlur={this.handleBlur}
                {...rest}
              />
            );
          }))}
          <SubmitButton submitDisabled={this.submitDisabled} />
        </Form>
      </div>
    );
  }
}

LoginForm.displayName = 'LoginForm';
export default LoginForm;
