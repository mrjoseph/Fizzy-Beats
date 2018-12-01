import Input from '../input/Input';

const USERNAME = [
  {
    Components: Input,
    text: 'username',
    name: 'username',
    type: 'text',
  },
];

const PASSWORD = [
  {
    Components: Input,
    text: 'password',
    name: 'password',
    type: 'password',
  },
];
const EMAIL = [
  {
    Components: Input,
    text: 'email',
    name: 'email',
    type: 'text',
  },
];

export const REGISTER = [USERNAME, EMAIL, PASSWORD];

export const LOGIN = [EMAIL, PASSWORD];
