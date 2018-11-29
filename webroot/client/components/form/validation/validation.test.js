import validation from './validation';

describe('validation', () => {
  const formErrors = { username: '', email: '', password: '' };
  describe('username', () => {
    const fieldName = 'username';
    it('should return a message that the username is invalid', () => {
      const value = 'tr';
      const expected = {
        usernameValid: false,
        formErrors: { ...formErrors, username: 'empty username' },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });

    it('should not return a message that the username is invalid', () => {
      const value = 'trevorj';
      const expected = {
        usernameValid: true,
        formErrors: { ...formErrors, username: '' },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });
  });
  describe('email', () => {
    const fieldName = 'email';
    it('should return a message that the email is invalid', () => {
      const value = 'test@test';
      const expected = {
        emailValid: false,
        formErrors: { ...formErrors, email: 'is invalid' },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });

    it('should not return a message that the email is invalid', () => {
      const value = 'test@test.com';
      const expected = {
        emailValid: true,
        formErrors: { ...formErrors, email: '' },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });
  });
  describe('password', () => {
    const fieldName = 'password';
    it('should return a message that the password is invalid', () => {
      const value = 'password';
      const expected = {
        passwordValid: false,
        formErrors: { ...formErrors, password: 'Your password should contain a number' },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });

    it('should not return a message that the email is invalid', () => {
      const value = 'password1';
      const expected = {
        passwordValid: true,
        formErrors: { ...formErrors, password: '' },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });
  });
});
