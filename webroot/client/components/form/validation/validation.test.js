import validation from './validation';

describe('validation', () => {
  const formErrors = { username: '', email: '', password: '' };
  describe('username', () => {
    const fieldName = 'username';
    it('should return a message that the username is invalid', () => {
      const value = 'tr';
      const expected = {
        formErrors: {
          ...formErrors,
          username: {
            field: fieldName,
            message: 'empty username',
            valid: false,
          },
        },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });

    it('should not return a message that the username is invalid', () => {
      const value = 'trevorj';
      const expected = {
        formErrors: {
          ...formErrors,
          username: {
            field: fieldName,
            message: '',
            valid: true,
          },
        },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });
  });
  describe('email', () => {
    const fieldName = 'email';
    it('should return a message that the email is invalid', () => {
      const value = 'test@test';
      const expected = {
        formErrors: {
          ...formErrors,
          email: {
            field: fieldName,
            message: 'is invalid',
            valid: false,
          },
        },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });

    it('should not return a message that the email is invalid', () => {
      const value = 'test@test.com';
      const expected = {
        formErrors: {
          ...formErrors,
          email: {
            field: fieldName,
            message: '',
            valid: true,
          },
        },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });
  });
  describe('password', () => {
    const fieldName = 'password';
    it('should return a message that the password is invalid', () => {
      const value = 'password';

      const expected = {
        formErrors: {
          ...formErrors,
          password: {
            field: fieldName,
            message: 'Your password should contain a number',
            valid: false,
          },
        },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });

    it('should not return a message that the email is invalid', () => {
      const value = 'password1';

      const expected = {
        formErrors: {
          ...formErrors,
          password: {
            field: fieldName,
            message: '',
            valid: true,
          },
        },
      };
      expect(validation(fieldName, value, formErrors)).toEqual(expected);
    });
  });
});
