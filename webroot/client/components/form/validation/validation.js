const validation = (fieldName, value, formErrors) => {
  let usernameValid;
  let emailValid;
  let passwordValid;
  const usernameRegExp = new RegExp(/[a-z]{3}/);
  const emailRegExp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  const passwordRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/i);
  switch (fieldName) {
    case 'username':
      usernameValid = usernameRegExp.test(value);
     
      return {
        formErrors: {
          ...formErrors,
          username: {
            field: fieldName,
            message: usernameValid ? '' : 'empty username',
            valid: usernameValid,
          },
        },
      };
    case 'email':
      emailValid = emailRegExp.test(value);
      return {
        formErrors: {
          ...formErrors,
          email: {
            field: fieldName,
            message: emailValid ? '' : 'is invalid',
            valid: emailValid,
          },
        },
      };
    case 'password':
      passwordValid = passwordRegExp.test(value);
      return {
        formErrors: {
          ...formErrors,
          password: {
            field: fieldName,
            message: passwordValid ? '' : 'Your password should contain a number',
            valid: passwordValid,
          },
        },
      };
    default:
      break;
  }
};
export default validation;
