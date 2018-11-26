import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../AuthService/AuthService';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Anna Havunta',
      password: 'password',
      // confirmPassword: '',
      email: 'anna.havunta@gmail.com',
      status: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
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
    return (
      <div>
        <h1>Register...</h1>
        {this.state.status ? (
          <div>
            {' '}
            {this.state.status}
          </div>
        ) : (<div> user added</div>)}
        <form id="form" onSubmit={e => this.handleSubmit(e)}>
          <div className="field">
            <label>Username:</label>
            <input type="text" onChange={e => this.setState({ username: e.target.value })} value={this.state.username} />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input type="text" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
          </div>
          <div className="field">
            <label>Password:</label>
            <input type="text" onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
          </div>

          <button className="submit">Sign up</button>
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
