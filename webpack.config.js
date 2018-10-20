const path = require('path');

module.exports = {
  entry: './webroot/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
