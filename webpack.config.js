'use strict';

// set NODE_ENV=development
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/index',
  output: {
    path: __dirname + '/public/script/',
    filename: '[name].js'
  },
  // watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: "'ru'"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ['babel'],
        include: __dirname + '',
        exclude: [/bower_components/, /node_modules/],
        query: {
          presets: ['es2015', 'es2016', 'es2017']
        }
      },
      {
        test: /\.jade$/,
        loader: 'pug-html-loader'
      },
      {
        test: /\.sass$/,
        loader: "style!css!sass"
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=../assets/[name].[ext]'
      }
    ],
    noParse: [/angular\/angular.js/]
  },
  // webpackScreenCast>webpack --profile --display-modules --display-reasons
};

if (NODE_ENV === 'build') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  )
}