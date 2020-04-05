import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import RegisterForm from './RegisterForm';
import AuthService from '../../../AuthService/AuthService';
jest.mock('../../../AuthService/AuthService');

describe('RegistrationForm', () => {
  describe('When Submitting the registrationForm', () => {
    describe('submit success', () => {
      const fields = [
        {
        value: 'trevor',
        name: 'username',
      },
      {
        value: 'trev_jos@hotmail.com',
        name: 'email',
      },
      {
        value: 'password1',
        name: 'password',
      }
    ];
      const replaceSpy = jest.fn();
      const handleSubmitSpy = jest.spyOn(RegisterForm.prototype, 'handleSubmit');
    
      const addUserSpy = jest.fn();
    
      let handleChange;
      let onChange;
      let component;
      const props = {
        addUser: addUserSpy,
        onChange: () => {},
        client: {},
        history: {
          replace: replaceSpy,
        },
      };
      beforeEach(() => {
        AuthService.mockImplementation(
          () => ({
            register: jest.fn().mockImplementation(() => Promise.resolve({
              status: 'SUCCESS'
          })),
          }),
        );
        handleChange = jest.spyOn(RegisterForm.prototype, 'handleChange');
        onChange = jest.fn(props.onChange);
        const newProps = { ...props, onChange };
        component = shallow(<RegisterForm {...newProps} />);
      });
      afterEach(() => {
        AuthService.mockRestore();
      });
      it('Should call my handleSubmit', async () => {
        const form = component.find('#form');
        const state = {
          username: 'trevor',
          password: 'password',
          email: 'test@test.com',
          status: null,
        };
        component.setState(state);
        form.simulate('submit', { preventDefault() {} });
        expect(await component.instance().Auth.register).toHaveBeenCalled();
        expect(handleSubmitSpy).toHaveBeenCalled();
        expect(replaceSpy).toHaveBeenCalled();
      });

      it('should call the handleChange for the username input', () => {
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
      it('should call the handleChange for the email input', () => {
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
      it('should call the handleChange for the password input', () => {
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
      it('should call handle blur', () => {
        const expectedState = {
          username: '',
          password: '',
          email: 'trev_jos@hotmail.com',
          status: null,
          formErrors: { password: { field: 'password', message: '', valid: true } },
        };
        const event = {
          target: {
            name: 'email',
            value: 'trev_jos@hotmail.com'
          }
        } 
        component.instance().handleBlur(event)
        expect(component.state().email).toEqual(expectedState.email);
      });
    });

    describe('submit, unsuccessful', () => {
      const replaceSpy = jest.fn();
      const handleSubmitSpy = jest.spyOn(RegisterForm.prototype, 'handleSubmit'); 
      const addUserSpy = jest.fn();
      let onChange;
      let component;
      const props = {
        addUser: addUserSpy,
        onChange: () => {},
        client: {},
        history: {
          replace: replaceSpy,
        },
      };
      beforeEach(() => {
        AuthService.mockImplementation(
          () => ({
            register: jest.fn().mockImplementation(() => Promise.resolve({
              status:'USER_EXISTS'
          })),
          }),
        );
        onChange = jest.fn(props.onChange);
        const newProps = { ...props, onChange };
        component = shallow(<RegisterForm {...newProps} />);
      });
      afterEach(() => {
        AuthService.mockRestore()
      });
      it('Should call my handleSubmit', async () => {
        const form = component.find('#form');
        form.simulate('submit', { preventDefault() {} });
        expect(await component.instance().Auth.register).toHaveBeenCalled();
        expect(handleSubmitSpy).toHaveBeenCalled();
        expect(replaceSpy).not.toHaveBeenCalled();
      });
    });
    describe('submitDisabled', () => {
      const props = {};
      it('should return true if we have no errors', () => {
        const component = shallow(<RegisterForm {...props} />); 
        component.setState({
          formErrors: {
            username: { 
              field: 'username',
              message: '',
              valid: false
            },
            password: { 
              field: 'password',
              message: '',
              valid: false
            },
            email: { 
              field: 'email',
              message: '',
              valid: false
            }
          },
        })
        const result = component.instance().submitDisabled();
        expect(result).toEqual(true)
      });
      it('should return false if we have errors', () => {
        const component = shallow(<RegisterForm {...props} />); 
        component.setState({
          formErrors: {
            username: { 
              field: 'username',
              message: '',
              valid: true
            },
            password: { 
              field: 'password',
              message: '',
              valid: true
            },
            email: { 
              field: 'email',
              message: '',
              valid: true
            }
          },
        })
        const result = component.instance().submitDisabled();
        expect(result).toEqual(false)
      });
    });
  });
});
