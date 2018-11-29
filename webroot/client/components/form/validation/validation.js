const validation = (fieldName, value, formErrors) => {
  let validUsername;
  let validEmail;
  let validPassword;

  switch (fieldName) {
    case 'username':
      validUsername = value.match(/[a-z]{3}/);
      if (Array.isArray(validUsername)) {
        return {
          usernameValid: true,
          formErrors: { ...formErrors, username: '' },
        };
      }
      return {
        usernameValid: false,
        formErrors: { ...formErrors, username: 'empty username' },
      };


    case 'email':
      validEmail = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
      if (Array.isArray(validEmail)) {
        return {
          emailValid: true,
          formErrors: { ...formErrors, email: '' },
        };
      }
      return {
        emailValid: false,
        formErrors: { ...formErrors, email: 'is invalid' },
      };

    case 'password':
      validPassword = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/i);
      if (Array.isArray(validPassword)) {
        return {
          passwordValid: true,
          formErrors: { ...formErrors, password: '' },
        };
      }
      return {
        passwordValid: false,
        formErrors: { ...formErrors, password: 'Your password should contain a number' },
      };

    default:
      break;
  }
};
export default validation;
