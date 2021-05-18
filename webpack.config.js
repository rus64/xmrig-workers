'use strict';

const path                  = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const SriPlugin             = require('webpack-subresource-integrity');


module.exports = {
  entry: {
    app: ['whatwg-fetch', './index.js', './scss/index.scss'],
  },
  output: {
    filename: 'assets/js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    crossOriginLoading: 'anonymous'
  },
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src'),
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080,
    historyApiFallback: true,
    compress: true,
    public: 'xmrig.russellyeo.dev'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.(scss)$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: process.env.NODE_ENV === 'production'
    }),
    new SriPlugin({
      hashFuncNames: ['sha512'],
      enabled: process.env.NODE_ENV === 'production'
    }),
  ]
};
