import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classname';
import { Label, Span, InputStyled } from './Input.styles';
import './input.css';

class Input extends Component {

  errorWarnings() {
    const { formErrors, name } = this.props;
    return formErrors && Object.keys(formErrors).map((key) => {
      if (name === key && formErrors[key]) {
        return (
          <div key={key}>
            {formErrors[key]}
          </div>
        );
      }
      return null;
    });
  }

  errorClass() {
    const { formErrors, name } = this.props;
    return Object.keys(formErrors).filter((key) => {
      if (name === key && formErrors[key]) {
        return formErrors[key];
      }
    });
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
            placeholder={name}
            className={classNames('input', { error: !!(this.errorClass().length) })}
          />
          <Span>{text}</Span>
        </Label>
        {/*{this.errorWarnings()}*/}
      </div>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  formErrors: PropTypes.objectOf(PropTypes.string).isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
Input.defaultProps = {
  // defaultValue: [],
};
export default Input;
