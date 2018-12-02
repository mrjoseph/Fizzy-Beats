import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import LoginForm from './LoginForm';
import {
  LOGIN_QUERY,
} from '../../../graphql/queries/queries';
import RegistrationForm from '../registrationForm/RegisterForm';


describe.skip('LoginForm', () => {
  it('must do something', () => {
    const replaceSpy = jest.fn();
    const props = {
      history: {
        replace: replaceSpy,
      },
    };
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
    const spy = jest.spyOn(RegistrationForm.prototype, 'handleSubmit');
    let component;
    component = shallow(
      <MockedProvider mock={mock} addTypename={false}>
        <LoginForm {...props} />
      </MockedProvider>,
    );
    console.log()
    // form.simulate('submit', { preventDefault() {} });
    // expect(spy).toHaveBeenCalled();
  });
});
