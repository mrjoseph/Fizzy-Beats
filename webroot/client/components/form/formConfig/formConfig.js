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
    accept: '.mp3,audio/*',
    autoComplete: 'off',
    multiple: true,
  }
];

const IMAGE_UPLOAD = [
  {
    Components: Input,
    text: 'Add a profile image.',
    name: 'upload',
    type: 'file',
    accept: 'image/png, image/jpeg',
    autoComplete: 'off',
    multiple: false,
  }
];
const UPLOAD_DETAILS = [
  {
    Components: Input,
    text: 'Artist',
    name: 'Artist',
    type: 'text',
  },
];

export const REGISTER = [USERNAME, EMAIL, PASSWORD];

export const LOGIN = [EMAIL, PASSWORD];

export const UPLOADER = [UPLOAD];

export const UPLOADER_DETAILS = [UPLOAD_DETAILS]

export const UPLOADER_IMAGE_UPLOAD = [IMAGE_UPLOAD];
