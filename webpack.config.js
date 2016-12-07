'use strict';

// set NODE_ENV=development
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: __dirname,

  // 'webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/only-dev-server',
  entry: {
    index: ['./frontend/index'],
    styles: './frontend/index.sass'
  },
  output: {
    path: __dirname + '/public',
    // publicPath: '/',
    filename: './script/[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    library: '[name]'
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 300
  },

  resolve: {
    extensions: ['', '.js', '.sass']
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: [
    new webpack.OldWatchingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: "'ru'"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // {disable:  NODE_ENV === 'development'}
    new ExtractTextPlugin('./assets/styles.[contenthash].css', { allChunks: true, disable: false }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/templateIndex/template.html',
      inject: false
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      open: false,
      port: 3000,
      server: { baseDir: ['public'] }
    })
    // for work with webpack dev server
    // new BrowserSyncPlugin({
    //   // browse to http://localhost:3000/ during development,
    //   // ./public directory is being served
    //   host: 'localhost',
    //   port: 3000,
    //   proxy: 'http://localhost:8080/',
    // }, {
    //   reload: false
    // })
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
        loader: 'pug-loader'
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap')
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=../assets/[name].[hash:6].[ext]'
      }
    ],
    noParse: [/angular\/angular.js/],
    // devServer: {
    //   host: 'localhost',
    //   port: 8080,
    //   contentBase: __dirname + '/public',
    //   hot: true
    // }
  },
  // webpackScreenCast>webpack --profile --display-modules --display-reasons
};

if (NODE_ENV === 'build') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  )
}