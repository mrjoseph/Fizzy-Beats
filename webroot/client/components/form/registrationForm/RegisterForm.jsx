import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import validation from '../validation/validation';
import { Form, Title } from '../../../views/register/Register.styles';
import AuthService from '../../../AuthService/AuthService';
import LOGIN from '../formConfig/formConfig';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      // confirmPassword: '',
      email: '',
      status: null,
      formErrors: {},
    };
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

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


  submitDisabled(){
    const username = _.get(this.state.formErrors, 'username.valid', false);
    const password = _.get(this.state.formErrors, 'password.valid', false);
    const email = _.get(this.state.formErrors, 'email.valid', false);
    return (!username || !password || !email);

  }
  render() {
    const { formErrors, status } = this.state;
    return (
        <div>
          {status && (
              <div className="alert alert-primary" role="alert">
                It looks like you already have a account <Link to="/login">login</Link>
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
              className={`submit btn ${!this.submitDisabled() ? 'btn-success' : 'btn-secondary'}`}
              type="submit"
              disabled={this.submitDisabled()}
            >
              Sign up
            </button>
          </Form>
        </div>
    );
  }
}

RegisterForm.propTypes = {
  addUser: PropTypes.func,
};

RegisterForm.defaultProps = {
  addUser: () => {},
};
RegisterForm.displayName = 'RegisterForm';
export default withRouter(RegisterForm);
