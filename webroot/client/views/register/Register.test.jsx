import React from 'react';
import { shallow } from 'enzyme';

import Register from './Register';

describe.skip('Register', () => {
  const spy = jest.spyOn(Register.prototype, 'handleSubmit');
  let component;
  const addUserSpy = jest.fn();
  const props = {
    addUser: addUserSpy,
  };
  beforeEach(() => {
    component = shallow(<Register {...props} />);
  });

  describe('When Submitting the registration registrationForm', () => {
    describe('submit', () => {
      it('Should call my handleSubmit', () => {
        const form = component.find('#registrationForm');
        const state = {
          username: 'trevor',
          password: 'password',
          email: 'test@test.com',
        };
        component.setState(state);
        form.simulate('submit', { preventDefault() {} });
        expect(spy).toHaveBeenCalled();
        expect(addUserSpy).toHaveBeenCalled();
      });
    });
  });
});
