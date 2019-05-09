import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthService from '../../AuthService/AuthService';
import ProfileImage from '../profile-image/ProfileImage';
import HeaderNavContainer, {
  LogoutButton,
  ProfileName,
  ProfileBlock,
} from './HeaderNav.styles';


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
    const { history: { replace } } = this.props;
    replace('/login');
  }

  toggleNav(e) {
    e.preventDefault();
    const { showHideNav } = this.state;
    this.setState({ showHideNav: !showHideNav });
  }

  render() {
    const { showHideNav } = this.state;
    console.log(this.props);
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">
          <Link className="navbar-brand" to="/">
            <strong>Fizzy Beats</strong>
          </Link>
        </div>
        <button
          onClick={this.toggleNav}
          className={`navbar-toggler ${showHideNav ? 'collapsed' : ''}`}
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
          className={`navbar-collapse ${showHideNav ? 'showContent' : 'hideContent'}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
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
            {!this.Auth.loggedIn() ? (
              <li className="nav-item">
                <Link to="/register" className="nav-link register-link">
                      Register
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/register" className="nav-link register-link">
                    Add release
                </Link>
              </li>
            )}
            {this.Auth.loggedIn() && (
              <li className="nav-item">
                <LogoutButton onClick={this.handleLogout} className="btn btn-link logout-link">Logout</LogoutButton>
              </li>
            )}
            {this.Auth.getProfile() && (
              <ProfileBlock className="nav-item active">
                <ProfileName className="btn current-user">
                  { `Logged in as ${this.Auth.getProfile().username}`}
                </ProfileName>
                <ProfileImage
                  width="30px"
                  userId={this.Auth.getProfile().id}
                  username={this.Auth.getProfile().username}
                  profileImage={false}
                />
              </ProfileBlock>
            )}
          </ul>
        </HeaderNavContainer>
      </nav>
    );
  }
}
Nav.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};
export default Nav;
