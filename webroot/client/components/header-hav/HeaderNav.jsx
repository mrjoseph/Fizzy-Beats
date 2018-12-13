import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../AuthService/AuthService';
import HeaderNavContainer, { LogoutButton, ProfileName } from './HeaderNav.styles';

class Nav extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = { showHideNav: false };
    this.Auth = new AuthService();
  }

  handleLogout() {
    this.Auth.logout();
    this.props.history.replace('/login');
  }

  toggleNav(e) {
    e.preventDefault();
    this.setState({ showHideNav: !this.state.showHideNav });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">
          <Link className="navbar-brand" to="/">
            <strong>Fizzy Beats</strong>
          </Link>
        </div>
        <button
            onClick={this.toggleNav}
            className={`navbar-toggler ${this.state.showHideNav ? 'collapsed' : ''}`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <HeaderNavContainer
            className={`navbar-collapse ${this.state.showHideNav ? 'showContent' : 'hideContent'}`}
            id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            {this.Auth.getProfile() && (
              <li className="nav-item active">
                <ProfileName className="btn current-user">
                  { `Logged in as ${this.Auth.getProfile().username}`}
                </ProfileName>
              </li>
            )}

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                  About
              </Link>
            </li>
            { this.Auth.loggedIn() ? (
              <li className="nav-item">
                <Link to="/profile" className="nav-link profile-link">
                  Profile
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link login-link">
           Login
                </Link>
              </li>
            )}
            {!this.Auth.loggedIn() && (
            <li className="nav-item">
              <Link to="/register" className="nav-link register-link">
                      Register
              </Link>
            </li>
            )}
            {this.Auth.loggedIn() && (
              <li className="nav-item">
                <LogoutButton onClick={this.handleLogout} className="btn btn-link logout-link">Logout</LogoutButton>
              </li>
            )}
          </ul>
        </HeaderNavContainer>
      </nav>
    );
  }
}

export default Nav;
