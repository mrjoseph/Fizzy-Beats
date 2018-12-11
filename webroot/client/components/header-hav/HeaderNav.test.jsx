import { shallow } from 'enzyme';
import React from 'react';
import HeaderNav from './HeaderNav';
import 'jest-styled-components';
import AuthService from '../../AuthService/AuthService';

const handleLogoutSpy = jest.spyOn(HeaderNav.prototype, 'handleLogout');

jest.mock('../../AuthService/AuthService');
describe('HeaderNav', () => {
  const replaceSpy = jest.fn();
  const props = {
    history: {
      replace: replaceSpy,
    },
  };
  beforeEach(() => {
    AuthService.mockClear();
  });

  describe('When user is logged in', () => {
    let component;
    let getProfileReturnValue;
    beforeEach(() => {
      getProfileReturnValue = {
        email: 'test@test.com',
        exp: 1575838244,
        iat: 1544280644,
        id: '5c031d9f39b17a5a5744bc7f',
        username: 'Tony Stark',
      };
      AuthService.mockImplementation(
        () => ({
          loggedIn: () => true,
          getProfile: jest.fn().mockReturnValue(getProfileReturnValue),
        }),
      );
      component = shallow(<HeaderNav {...props} />);
    });
    it('should display the logged in user when logged in', () => {
      const currentUser = component.find('.current-user');
      expect(currentUser).toHaveLength(1);
      expect(currentUser.text()).toEqual('Logged in as Tony Stark');
    });
    it('should display the profile link', () => {
      const profileLink = component.find('.profile-link');
      expect(profileLink).toHaveLength(1);
      expect(profileLink.props().children).toEqual('Profile');
    });
    it('should display the logout button', () => {
      const logout = component.find('.logout-link');
      expect(logout).toHaveLength(1);
      expect(logout.props().children).toEqual('Logout');
    });
  });
  describe('When user is not logged in', () => {
    let component;
    let getProfileReturnValue;
    beforeEach(() => {
      getProfileReturnValue = null;
      AuthService.mockImplementation(
        () => ({
          loggedIn: () => false,
          getProfile: jest.fn().mockReturnValue(getProfileReturnValue),
        }),
      );
      component = shallow(<HeaderNav {...props} />);
    });
    it('should display the logged in user when logged in', () => {
      const currentUser = component.find('.current-user');
      expect(currentUser).toHaveLength(0);
    });

    it('should display the profile link', () => {
      const loginLink = component.find('.login-link');
      expect(loginLink).toHaveLength(1);
      expect(loginLink.props().children).toEqual('Login');
    });
    it('should display the register link', () => {
      const registerLink = component.find('.register-link');
      expect(registerLink).toHaveLength(1);
      expect(registerLink.props().children).toEqual('Register');
    });
  });
  describe('logout button', () => {
    let component;
    let getProfileReturnValue;
    beforeEach(() => {
      getProfileReturnValue = {
        email: 'test@test.com',
        exp: 1575838244,
        iat: 1544280644,
        id: '5c031d9f39b17a5a5744bc7f',
        username: 'Tony Stark',
      };
      AuthService.mockImplementation(
        () => ({
          loggedIn: () => true,
          logout: () => jest.fn(),
          getProfile: jest.fn().mockReturnValue(getProfileReturnValue),
        }),
      );
      component = shallow(<HeaderNav {...props} />);
    });
    it('should logout the user', () => {
      const logout = component.find('.logout-link');

      logout.simulate('click', { preventDefault() {} });
      expect(handleLogoutSpy).toHaveBeenCalled();
      expect(replaceSpy).toHaveBeenCalled();
      expect(replaceSpy).toHaveBeenCalledWith('/login');
    });
  });
});
