import React from 'react';
import renderer from 'react-test-renderer';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


import { MockedProvider } from 'react-apollo/test-utils';
import LoginForm from './LoginForm';
import {
  LOGIN_QUERY,
} from '../../../graphql/queries/queries';

import AuthService from '../../../AuthService/AuthService';
jest.mock('../../../AuthService/AuthService');

describe('LoginForm', () => {
  const replaceSpy = jest.fn();
  const props = {
    client: {},
    history: {
      replace: replaceSpy,
    },
  };
  describe('Graphql', () => {
    const mock = [
      {
        request: {
          query: LOGIN_QUERY,
          variables:
              {
                email: 'test@test.com',
                password: 'password1',
              },
          name: 'loginQuery',
        },
        result: {
          data: {
            user: {
              id: '1',
              username: 'test',
              email: 'test@test.com',
              status: 'SUCCESS',
              auth: '1234567',
            },
          },
        },
      },
    ];
    it('should render without errors', () => {
      renderer.create(
        <MockedProvider mock={mock} addTypename={false}>
          <LoginForm {...props} />
        </MockedProvider>,
      );
    });
  })
  describe('Submit', () => {
    describe('successful submit', () => {
      let component;
      let handleSubmitSpy;
      let data;
      beforeEach(() => {
        data = {
          loginUser: {
            status: 'SUCCESS'
          }
        };
        handleSubmitSpy = jest.spyOn(LoginForm.prototype, 'handleSubmit');
        AuthService.mockImplementation(
          () => ({
            loggedIn: () => returnValue,
            login: jest.fn().mockImplementation(() => Promise.resolve(data)),
          }),
        );
 
        component = shallow(<LoginForm {...props} />);
 
      });
      it('should call preventDefault', async () => {
        const form = component.find('#form');
        form.simulate('submit', { preventDefault() {} });
        expect(handleSubmitSpy).toHaveBeenCalled();
        expect(await component.instance().Auth.login).toHaveBeenCalled();
        expect(replaceSpy).toHaveBeenCalled();
      });
    })

    describe('unsuccessful submit', () => {
      let component;
      let data;
      beforeEach(() => {
        data = {
          loginUser: {
            status: 'NO_USER_FOUND'
          }
        };
        
        AuthService.mockImplementation(
          () => ({
            loggedIn: () => returnValue,
            login: jest.fn().mockImplementation(() => Promise.resolve(data)),
          }),
        );
 
        component = shallow(<LoginForm {...props} />);
 
      });
      it('should call preventDefault', async () => {
        const form = component.find('#form');
        form.simulate('submit', { preventDefault() {} });
        expect(await component.instance().Auth.login).toHaveBeenCalled();
        expect(replaceSpy).toHaveBeenCalled();
      });
    })
  });

  describe('handleChange', () => {
    let component;
    beforeEach(() => {
    
      component = shallow(<LoginForm {...props} />);
    });
    it('should call setState', () => {
      const evt = {
        target: {
          name: 'email',
          value: 'tony.stark@stark-interprises.net',
        }
      }
      component.instance().handleChange(evt);
      expect(component.state().email).toEqual('tony.stark@stark-interprises.net');
    });
  });

  describe('submitDisabled', () => {
    let component;
    beforeEach(() => {
      component = shallow(<LoginForm {...props} />);
    });
    it('should return false', () => {
      const state = {
        formErrors: {
          email: {field: "email", message: "", valid: true},
          password: {field: "password", message: "", valid: true},
        },
      };
      component.setState(state);
      expect(component.instance().submitDisabled()).toEqual(false)
    });
  });

  describe('handleBlur', () => {
    let component;
    beforeEach(() => {
      component = shallow(<LoginForm {...props} />);
    });
    it('should call setState', () => {
      const evt = {
        target: {
          name: 'email',
          value: 'tony.stark@stark-interprises.net',
        }
      }
      component.instance().handleBlur(evt);
      expect(component.state().email).toEqual('tony.stark@stark-interprises.net');
    });
  });

  // it('must do something', () => {
  //   const replaceSpy = jest.fn();
  //   const props = {
  //     history: {
  //       replace: replaceSpy,
  //     },
  //   };
  //   const mock = [
  //     {
  //       request: {
  //         query: LOGIN_QUERY,
  //         variables:
  //             {
  //               email: 'test@test.com',
  //               password: 'password1',
  //             },
  //         name: 'loginQuery',
  //       },
  //       result: {
  //         data: {
  //           user: {
  //             id: '1',
  //             username: 'test',
  //             email: 'test@test.com',
  //             status: 'SUCCESS',
  //             auth: '1234567',
  //           },
  //         },
  //       },
  //     },
  //   ];
  //   const spy = jest.spyOn(RegistrationForm.prototype, 'handleSubmit');
  //   let component;
  //   renderer.create(
  //     <MockedProvider mock={mock} addTypename={false}>
  //       <LoginForm {...props} />
  //     </MockedProvider>,
  //   );
  //   //const form = component.find('#form');

  //  // form.simulate('submit', { preventDefault() {} });
  //   //expect(spy).toHaveBeenCalled();
  // });
});