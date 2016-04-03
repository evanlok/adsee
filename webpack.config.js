var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  // the main entry point for our application's frontend JS
  entry: {app: './client/app/app.js'},

  output: {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname, 'public', 'assets', 'webpack'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: '[name]-bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: 'http://localhost:8080/assets/webpack/'
  },

  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),

    new ngAnnotatePlugin({add: true}),
    new AssetsPlugin({path: path.join(__dirname, 'public', 'assets')})
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      // Not all apps require jQuery. Many Rails apps do, such as those using TurboLinks or
      // bootstrap js
      {test: /jquery\.js$/, loader: "expose?$!expose?jQuery"},
      {test: /lodash\.js$/, loader: "expose?_"},
      {test: /Sortable\.js$/, loader: "expose?Sortable"}
    ]
  }
};
