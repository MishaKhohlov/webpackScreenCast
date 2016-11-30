'use strict';

// set NODE_ENV=development
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = [
  {
    context: __dirname + '/frontend',
    // common: ['./common.js', 'libs']
    // export in lib last dependency

    entry: {
      home: './home.js',
      about: './about.js',
      common: ['./common.js']
    },
    output: {
      path: __dirname + '/public/script/',
      filename: '[name].js',
      library: '[name]'
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 3,
        chunks: ['home', 'about']
      }),
      new webpack.ProvidePlugin({
        pluck: 'lodash/fp/pluck'
      })
    ],

    module: {
      loaders: [{
        test: /\.js$/,
        loader: ['babel'],
        // should be used
        include: __dirname + '/frontend',
        //should be used to exclude exceptions
        exclude: [/bower_components/, /node_modules/],
        query: {
          presets: ['es2015', 'es2016', 'es2017']
          // plugins: ['transform-runtime']
        }
      }],
      noParse: [/angular\/angular.js/]
    },
    // webpackScreenCast>webpack --profile --display-modules --display-reasons


    external: {
      // jquery: '$'
    }
  }
  /*, {
    context: __dirname + '/frontend',

    entry: {
      app: './app.js'
    },
    output: {
      path: __dirname + '/public/lazy/',
      publicPath: '/webpackScreenCast/public/lazy/',
      filename: '[name].js'
    },

    watchOptions: {
      aggregateTimeout: 100
    },

    plugins: [
      new webpack.NoErrorsPlugin()
    ],

    module: {
      loaders: [{
        test: /\.js$/,
        loader: ['babel'],
        // should be used
        include: [
          path.resolve(__dirname, '/'),
        ],
        //should be used to exclude exceptions
        exclude: '/(node_modules|bower_components)/',
        query: {
          presets: ['es2015', 'es2016', 'es2017']
        }
      }]
    }
  }*/
];

if (NODE_ENV === 'build') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  )
}