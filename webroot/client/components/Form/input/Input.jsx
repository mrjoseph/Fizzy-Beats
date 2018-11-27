import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  name, text, onChange, defaultValue, type, formErrors, handleBlur,
}) => (
  <div className="field">
    <label htmlFor={name}>
      {text}
      <input
        type={type}
        onChange={onChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        name={name}
      />
    </label>
    {Object.keys(formErrors || {}).map((key) => {
      if (name === key) {
        return (
          <div key={key}>
            {formErrors[key]}
          </div>
        );
      }
      return null;
    })}
  </div>
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  formErrors: PropTypes.objectOf(PropTypes.string).isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
Input.defaultProps = {
  defaultValue: '',
};
export default Input;
