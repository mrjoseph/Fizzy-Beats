import Input from '../input/Input';

const USERNAME = [
  {
    Component: Input,
    text: 'username',
    name: 'username',
    type: 'text',
  },
];

const PASSWORD = [
  {
    Component: Input,
    text: 'password',
    name: 'password',
    type: 'password',
  },
];
const EMAIL = [
  {
    Component: Input,
    text: 'email',
    name: 'email',
    type: 'text',
  },
];

const LOGIN = [USERNAME, EMAIL, PASSWORD];

export default LOGIN;
