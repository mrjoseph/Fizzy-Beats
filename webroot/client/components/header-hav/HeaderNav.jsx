import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../../AuthService/AuthService';

const Auth = new AuthService();

class Nav extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">
          <Link className="navbar-brand" to="/">
            <strong>Fizzy Beats</strong>
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {Auth.getProfile() && (
              <li className="nav-item active">
                <span className="btn btn-link">
                  {' '}
                  { Auth.getProfile().username}
                </span>
              </li>
            )}

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                  About
              </Link>
            </li>
            { Auth.loggedIn() ? (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
           Login
                </Link>
              </li>
            )}
            {!Auth.loggedIn() && (
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                      Register
              </Link>
            </li>
            )}
            {Auth.loggedIn() && (
              <li className="nav-item">
                <button onClick={this.handleLogout} className="btn btn-link">Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
