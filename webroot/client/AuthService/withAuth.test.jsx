import React, { Component } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import withAuth from './withAuth';
import AuthService from './AuthService';

jest.mock('./AuthService');


class MyComponent extends Component {
  render(){
    return (<div>hello world</div>)
  }
};  

const replaceSpy = jest.fn();

describe('withAuth', () => {
  let returnValue;
  let wrapper;
  const props = {
    history: {
      replace: replaceSpy,
      location: {
        pathname: '/my-account'
      }
    }
  };
  const HOC = withAuth(MyComponent);
  describe('When the component mounts', () => {
    beforeEach(() => {
      AuthService.mockImplementation(
        () => ({
          loggedIn: () => returnValue,
          logout: () => jest.fn(),
          getProfile: jest.fn().mockReturnValue({
            username: 'Tony',
            email: 'tony@stark-industries.net',
          })
        }),
      );
    });
    it('It should redirect the user to the register page if they are not logged in and they are on my-account', () => {
      localStorage.setItem('id_token', 'foobar');
      returnValue = false;
      const newProps = {
        ...props, 
        history: {
          replace: replaceSpy,
          location: {
            pathname: '/my-account'
          }
        }
      }
      wrapper = shallow(<HOC {...newProps} />);
      expect(replaceSpy).toHaveBeenCalled();
    });

    it('It should call the Auth.getProfile() function if the user is logged in' , () => {
      returnValue = true;
      const newProps = {
        ...props, 
        history: {
          replace: replaceSpy,
          location: {
            pathname: ''
          }
        }
      }
      wrapper = shallow(<HOC {...newProps} />);
      expect(wrapper.instance().Auth.getProfile).toHaveBeenCalled();  
    });
  });
  describe('When the component mounts', () => {
    describe('And the user' , () => {
      it('it should log the user out', async () => {
        
      })
    });
  })
});
