import { shallow } from 'enzyme/build/index';
import React from 'react';
import RegistrationForm from './RegisterForm';

describe('RegistrationForm', () => {
  const spy = jest.spyOn(RegistrationForm.prototype, 'handleSubmit');
  let component;
  const addUserSpy = jest.fn();
  const props = {
    addUser: addUserSpy,
    onChange: () => {},
  };
  let handleChange;
  let onChange;

  beforeEach(() => {
    handleChange = jest.spyOn(RegistrationForm.prototype, 'handleChange');
    onChange = jest.fn(props.onChange);
    const newProps = { ...props, onChange };
    component = shallow(<RegistrationForm {...newProps} />);
  });


  describe('When Submitting the registration registrationForm', () => {
    describe('submit', () => {
      const fields = [{
        value: 'trevor',
        name: 'username',
      }, {
        value: 'trev_jos@hotmail.com',
        name: 'email',
      },
      {
        value: 'password1',
        name: 'password',
      }];
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

      it('should call the handleChange function on username', () => {
        const expectedState = {
          username: 'trevor',
          password: 'foobar1',
          email: 'trev_jos@hotmail.com',
          status: null,
          formErrors: { username: { field: 'username', message: '', valid: true } },
        };

        const username = component.find('#form').childAt(0);
        username.simulate('change', {
          target: fields[0],
        });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledWith({
          target: fields[0],
        });
        expect(component.state().username).toEqual(expectedState.username);
        expect(component.state().formErrors.username.valid)
          .toEqual(expectedState.formErrors.username.valid);
      });
      it('should call the handleChange function on email', () => {
        const expectedState = {
          username: 'trevor',
          password: 'foobar1',
          email: 'trev_jos@hotmail.com',
          status: null,
          formErrors: { email: { field: 'email', message: '', valid: true } },
        };

        const username = component.find('#form').childAt(1);
        username.simulate('change', {
          target: fields[1],
        });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledWith({
          target: fields[1],
        });
        expect(component.state().email).toEqual(expectedState.email);
        expect(component.state().formErrors.email.valid)
          .toEqual(expectedState.formErrors.email.valid);
      });
      it('should call the handleChange function on password', () => {
        const expectedState = {
          username: 'trevor',
          password: 'password1',
          email: 'trev_jos@hotmail.com',
          status: null,
          formErrors: { password: { field: 'password', message: '', valid: true } },
        };

        const username = component.find('#form').childAt(2);
        username.simulate('change', {
          target: fields[2],
        });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledWith({
          target: fields[2],
        });
        expect(component.state().password).toEqual(expectedState.password);
        expect(component.state().formErrors.password.valid)
          .toEqual(expectedState.formErrors.password.valid);
      });
    });
  });
});
