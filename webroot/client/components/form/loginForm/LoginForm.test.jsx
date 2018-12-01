import { shallow } from 'enzyme';
import React from 'react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const spy = jest.spyOn(LoginForm.prototype, 'handleSubmit');
  let component;
  const addUserSpy = jest.fn();
  const props = {
    addUser: addUserSpy,
    onChange: () => {},
  };
  let handleChange;
  let onChange;

  beforeEach(() => {
    handleChange = jest.spyOn(LoginForm.prototype, 'handleChange');
    onChange = jest.fn(props.onChange);
    const newProps = { ...props, onChange };
    component = shallow(<LoginForm {...newProps} />);
  });


  describe('When Submitting the LoginForm', () => {
    describe('submit', () => {
      const fields = [{
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
          password: 'password',
          email: 'test@test.com',
          status: null,
        };
        component.setState(state);
        form.simulate('submit', { preventDefault() {} });
        expect(spy).toHaveBeenCalled();
        expect(addUserSpy).toHaveBeenCalled();
      });

      it('should call the handleChange for the email input', () => {
        const expectedState = {
          password: 'foobar1',
          email: 'trev_jos@hotmail.com',
          status: null,
          formErrors: { email: { field: 'email', email: '', valid: true } },
        };

        const email = component.find('#form').childAt(0);
        email.simulate('change', {
          target: fields[0],
        });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledWith({
          target: fields[0],
        });
        expect(component.state().email).toEqual(expectedState.email);
        expect(component.state().formErrors.email.valid)
          .toEqual(expectedState.formErrors.email.valid);
      });
      it('should call the handleChange for the password input', () => {
        const expectedState = {
          password: 'password1',
          email: 'trev_jos@hotmail.com',
          status: null,
          formErrors: { password: { field: 'password', message: '', valid: true } },
        };

        const username = component.find('#form').childAt(1);
        username.simulate('change', {
          target: fields[1],
        });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledWith({
          target: fields[1],
        });
        expect(component.state().password).toEqual(expectedState.password);
        expect(component.state().formErrors.password.valid)
          .toEqual(expectedState.formErrors.password.valid);
      });
    });
  });
});
