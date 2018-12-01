import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classname';
import { Label, Span, InputStyled } from './Input.styles';
import './input.css';

class Input extends Component {

  errorClass() {
    const { formErrors, name } = this.props;
    if (formErrors[name] && formErrors[name].valid) {
      return 'success';
    }
    if (formErrors[name] && !formErrors[name].valid) {
      return 'error';
    }
    return '';
  }

  render() {
    const {
      name, text, onChange, type, handleBlur,
    } = this.props;
    return (
      <div className="field">
        <Label htmlFor={name}>
          <InputStyled
            type={type}
            onChange={onChange}
            onBlur={handleBlur}
            name={name}
            id={name}
            placeholder={name}
            className={`${this.errorClass()} input`}
          />
          <Span>{text}</Span>
        </Label>
        {/* {this.errorWarnings()} */}
      </div>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  formErrors: PropTypes.shape({
    valid: PropTypes.bool,
  }).isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
Input.displayName = 'Input';
export default Input;
