require('dotenv').config();
require('babel-register')({
    ignore: /\/(build|node_modules)\//,
    presets: ['env', 'react-app'],
});
require('./server');
