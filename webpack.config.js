const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './customer_router_1/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'customer_router_1.bundle.js',
  },
  devServer: {
    port: 8081,
  },
  devtool: 'source-line-map',
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './customer_router_1/index.html',
    }),
  ],
};
