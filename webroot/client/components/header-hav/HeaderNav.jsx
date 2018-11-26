import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <strong>Fizzy Beats</strong>
          </Link>
        </div>
        <div className="navbar-menu">
          <ul className="navbar-end">
            {Auth.getProfile() && (
            <li>
              { Auth.getProfile().username}
            </li>
            )}
            <li>
              <Link to="/about" className="navbar-item">
                  About
              </Link>
            </li>
            { Auth.loggedIn() ? (
              <li>
                <Link to="/profile" className="navbar-item">
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="navbar-item">
           Login
                </Link>
              </li>
            )}
            <div className="navbar-item join">
              {!Auth.loggedIn() && (
              <li>
                <Link to="/register" className="navbar-item">
                      Register
                </Link>
              </li>
              )}
              {Auth.loggedIn() && (
              <li>
                <button onClick={this.handleLogout}>Logout</button>
              </li>
              )}
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
