const path = require('path');
const webpack = require('webpack');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: ['babel-loader'],
        test: /\.js$/
      },
      {
        loader: 'style-loader!css-loader!sass-loader',
        test: /\.scss$/
      }
    ]
  }
}

module.exports = config;
