import { isEmpty } from 'lodash';

export const validations = {
  messages: {},
};

const validate = (values, props) => {
  const errors = {};
  const { config: { fieldRows } } = props;

  fieldRows.forEach((fields) => {
    const { name, required } = fields;
    if (isEmpty(values[name]) && required) {
      errors[name] = fields.validationMessageKeys.required;
      errors[name] = fields.validationMessageKeys.required;
    }

    if (!isEmpty(values[name]) && fields.regex && !fields.regex.test(values[name])) {
      errors[name] = fields.validationMessageKeys.valid;
      errors[name] = fields.validationMessageKeys.required;
    }
    if (!isEmpty(values[name])
        && fields.matchField && values[name] !== values[fields.matchField]) {
      errors[name] = fields.validationMessageKeys.match;
      errors[name] = fields.validationMessageKeys.required;
    }
  });

  validations.messages = errors;
  return errors;
};

export default validate;
