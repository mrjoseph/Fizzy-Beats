const path = require('path');

module.exports = {
  entry: './webroot/server/index.js',
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'bundle.js',
  },
};
