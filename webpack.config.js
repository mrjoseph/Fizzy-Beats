const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const devServerHTML = () => {
    return new HtmlWebPackPlugin({
      template: "./webroot/template/index.html",
      filename: "./index.html"
    });
}
module.exports = (env, argv) => {
  const { mode } = argv;
  const plugins = [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    })
]
  if (mode === 'development') {
    plugins.push(devServerHTML())
  }
  return {
    entry: './webroot/client/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    },
    plugins,
    devServer: {
      publicPath: '/',
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000
    }
  };
}
