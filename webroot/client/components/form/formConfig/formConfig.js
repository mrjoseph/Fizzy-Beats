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
const UPLOAD = [
  {
    Components: Input,
    text: 'Drag your files here or click in this area.',
    name: 'upload',
    type: 'file',
    autoComplete: 'off',
  }
];

export const REGISTER = [USERNAME, EMAIL, PASSWORD];

export const LOGIN = [EMAIL, PASSWORD];

export const UPLOADER = [UPLOAD];
