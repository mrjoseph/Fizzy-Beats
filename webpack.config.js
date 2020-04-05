const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const devServerHTML = () => new HtmlWebPackPlugin({
  template: './webroot/template/index.html',
  filename: './index.html',
});
module.exports = (env, argv) => {
  const { mode } = argv;
  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: '[id].css',
    }),
  ];
  if (mode === 'development') {
    plugins.push(devServerHTML());
  }
  return {
    entry: './webroot/client/index.jsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'assets/js/bundle.js',
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/images/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins,
    devServer: {
      publicPath: '/',
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000,
    },
  };
};
