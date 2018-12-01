import { shallow } from 'enzyme';
import React from 'react';
import Input from './Input';
import 'jest-styled-components';

describe('Input', () => {
  const props = {
    formErrors: {
      username: {
        field: 'username',
        message: 'empty username',
        valid: false,
      },
    },
    name: 'username',
    text: '',
    onChange: jest.fn(),
    type: '',
    id: 'username',
    handleBlur: jest.fn(),
  };
  let component;


  describe('With no errors', () => {
    beforeEach(() => {
      component = shallow(<Input {...props} />);
    });

    it('should have no error class', () => {
      const input = component.find('.input');
      input.simulate('change', {
        target: {
          name: 'username',
          value: 'trevor',
        },
      });

      expect(props.onChange).toHaveBeenCalled();
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          name: 'username',
          value: 'trevor',
        },
      });
      expect(input.hasClass('error')).toBe(true);
    });
  });

  describe('With error', () => {
    const formErrors = {
      username: {
        field: 'username',
        message: '',
        valid: true,
      },
    };
    const propsWithError = {
      formErrors, ...props,
    };
    beforeEach(() => {
      component = shallow(<Input {...propsWithError} />);
    });
    it('input should have a error class', () => {
      const input = component.find('.input');
      expect(input.hasClass('error')).toBe(true);
    });
  });

  describe('With success', () => {
    const formErrors = {
      username: {
        field: 'username',
        message: '',
        valid: false,
      },
    };
    const propsWithError = {
      formErrors, ...props,
    };
    beforeEach(() => {
      component = shallow(<Input {...propsWithError} />);
    });
    it('input should have a success class', () => {
      const input = component.find('.input');
      expect(input.hasClass('success')).toBe(false);
    });
  });
});
