import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import renderer from 'react-test-renderer';
import MockRouter from 'react-mock-router';
import { MockedProvider } from 'react-apollo/test-utils';
import Register from './Register';
import AuthService from '../../AuthService/AuthService';
import RegistrationForm from '../../components/form/registrationForm';
import { ADD_USER_MUTATION } from '../../graphql/queries/queries';

jest.mock('../../AuthService/AuthService');


describe('Register view', () => {
  let component;
  const replaceSpy = jest.fn();
  const props = {
    history: {
      replace: replaceSpy,
    },
  };
  beforeEach(() => {
    AuthService.mockClear();
  });

  describe('When loading', () => {
    beforeEach(() => {
      AuthService.mockImplementation(
        () => ({
          loggedIn: jest.fn().mockReturnValue(true),
          logout: () => jest.fn(),
        }),
      );
    });
    describe('check if the user is logged in', () => {
      it('and Should redirect the user to the homepage', () => {

        component = shallow(<Register {...props} />);
        component.instance().componentDidUpdate()
        expect(replaceSpy).toHaveBeenCalledWith('/');
      });

      describe('and Should load the registration form', () => {
        let returnValue;
        beforeEach(() => {
          returnValue = false;
          component = shallow(<Register {...props} />);
        });
        it('should load the registeration form', () => {
          const registrationForm = component.find(RegistrationForm);
          expect(registrationForm).toHaveLength(1);
        });
        it('snapshot', () => {
          const tree = renderer.create(
            <MockRouter>
              <MockedProvider client={ADD_USER_MUTATION}>
                <Register {...props} />
              </MockedProvider>
            </MockRouter>,
          ).toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });
});
