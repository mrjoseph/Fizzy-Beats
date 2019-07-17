import React from 'react';
import HeaderNav from './HeaderNav';
import 'jest-styled-components';
import AuthService from '../../AuthService/AuthService';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const handleLogoutSpy = jest.spyOn(HeaderNav.prototype, 'handleLogout');
const toggleNavSpy = jest.spyOn(HeaderNav.prototype,'toggleNav');

jest.mock('../../AuthService/AuthService');

// jest.unmock('../../AuthService/AuthService');
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
        id: '5c410f6e84d980e324c5ade8',
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
      expect(currentUser.text()).toEqual('Tony Stark');
    });
    it('should display the profile link', () => {
      const profileLink = component.find('.profile-link');
      expect(profileLink).toHaveLength(1);
      expect(profileLink.props().children).toEqual('My account');
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
        id: '5c410f6e84d980e324c5ade8',
        username: 'Tony Stark',
      };
      AuthService.mockImplementation(
        () => ({
          loggedIn: () => jest.fn(() => true),
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

  describe('toggleNav button', () => {
    let component;
    let getProfileReturnValue;
    beforeEach(() => {
      getProfileReturnValue = {
        email: 'test@test.com',
        exp: 1575838244,
        iat: 1544280644,
        id: '5c410f6e84d980e324c5ade8',
        username: 'Tony Stark',
      };
      AuthService.mockImplementation(
        () => ({
          loggedIn: () => jest.fn(() => true),
          logout: () => jest.fn(),
          getProfile: jest.fn().mockReturnValue(getProfileReturnValue),
        }),
      );
      component = shallow(<HeaderNav {...props} />);
    });
    it('should toggle the nav header', () => {
     
      const navBarToggler = component.find('.navbar-toggler');
      navBarToggler.simulate('click', { preventDefault() {} });
      expect(toggleNavSpy).toHaveBeenCalled();
    });
  });
});
