import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { Label, UploadLabel, InputStyled, UploadInput } from './Input.styles';
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
    type: 'file',
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
      expect(input.props().theme).toEqual({ error: 'red' });
    });
  });

  describe('With error', () => {
    const formErrors = {
      username: {
        field: 'username',
        message: '',
        valid: false,
      },
    };
    const propsWithError = {
      ...props, formErrors,
    };
    beforeEach(() => {
      component = shallow(<Input {...propsWithError} />);
    });
    it('input should have a error class', () => {
      const input = component.find('.input');
      expect(input.props().theme).toEqual({ error: 'red' });
      expect(component.instance().errorClass()).toEqual('red');
    });
  });

  describe('With success', () => {
    const formErrors = {
      username: {
        field: 'username',
        message: '',
        valid: true,
      },
    };
    const propsWithError = {
      ...props, formErrors,
    };
    beforeEach(() => {
      component = shallow(<Input {...propsWithError} />);
    });
    it('input should have a success class', () => {
      const input = component.find('.input');
      expect(input.props().theme).toEqual({ error: '#abe2b7' });
      expect(component.instance().errorClass()).toEqual('#abe2b7');
    });
  });

  describe('With no props', () => {
    const formErrors = {};
    const propsWithError = {
      ...props, formErrors,
    };
    beforeEach(() => {
      component = shallow(<Input {...propsWithError} />);
    });
    it('input should have a success class', () => {
      const input = component.find('.input');
      expect(input.props().theme).toEqual({ error: '#fff' });
      expect(component.instance().errorClass()).toEqual('#fff');
    });
  });

  describe('render input as upload', () => {
    beforeEach(() => {
      component = shallow(<Input {...props} />);
    });
    it('should render the UploadLabel component if the file type is file', () => {
      const uploadForm = component.find(UploadLabel);
      expect(uploadForm).toHaveLength(1);
    })
  });

  describe('render input as text', () => {
    let inputProps = {
      ...props,
      type: 'text',
    }
    beforeEach(() => {
      component = shallow(<Input {...inputProps} />);
    });
    it('should render the UploadLabel component if the file type is file', () => {
      const label = component.find(Label);
      expect(label).toHaveLength(1);
    })
  });

  describe('InputStyled styled component', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<InputStyled />).toJSON();
      expect(tree).toMatchSnapshot();
  });
  })
  describe('UploadInput styled component', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<UploadInput />).toJSON();
      expect(tree).toMatchSnapshot();
  });
  })
});
