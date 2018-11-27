import React from 'react';
import { shallow } from 'enzyme';
import AuthService from './AuthService';
import withAuth from './withAuth';

jest.mock('./AuthService');
let returnValue;
AuthService.mockImplementation(
  () => ({
    loggedIn: () => returnValue,
    logout: () => jest.fn(),
  }),
);

describe('withAuth', () => {
  let wrapper;
  const Component = () => (<div>hello world</div>);
  const HOC = withAuth(Component);
  const replaceSpy = jest.fn();
  const props = {
    history: {
      replace: replaceSpy,
    },
  };
  beforeEach(() => {
    AuthService.mockClear();
  });
  describe('If we are not logged in', () => {
    it('should redirect us to the /register page', () => {
      localStorage.setItem('id_token', 'foobar');
      returnValue = false;
      shallow(<HOC {...props} />);
      expect(replaceSpy).toHaveBeenCalled();
      expect(replaceSpy).toHaveBeenCalledWith('/register');
    });
    it('should redirect us to the /register page', () => {
      localStorage.setItem('id_token', 'foobar');
      returnValue = true;
      shallow(<HOC {...props} />);
      expect(replaceSpy).toHaveBeenCalled();
      expect(replaceSpy).toHaveBeenCalledWith('/login');
    });
    it('should redirect us to the /register page', () => {
      localStorage.setItem('id_token', 'foobar');
      returnValue = {};
      shallow(<HOC {...props} />);
      expect(replaceSpy).toHaveBeenCalled();
      expect(replaceSpy).toHaveBeenCalledWith('/login');
    });
  });
});
