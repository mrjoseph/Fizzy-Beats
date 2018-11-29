import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Register from './Register';

configure({ adapter: new Adapter() });

describe('Register', () => {
  const spy = jest.spyOn(Register.prototype, 'handleSubmit');
  let component;
  const addUserSpy = jest.fn();
  const props = {
    addUser: addUserSpy,
  };
  beforeEach(() => {
    component = shallow(<Register {...props} />);
  });

  describe('When Submitting the registration form', () => {
    describe('submit', () => {
      it('Should call my handleSubmit', () => {
        const form = component.find('#form');
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
