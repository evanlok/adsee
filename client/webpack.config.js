var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  // the main entry point for our application's frontend JS
  entry: {app: './app/app.js'},
  // Don't generate source maps in dev for faster rebuilds
  devtool: "eval",

  output: {
    // Write bundles to public/assets/webpack
    path: path.join(__dirname, '..', 'public', 'assets', 'webpack'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: '[name]-bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: 'http://localhost:8080/assets/webpack/',
    pathinfo: true
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
    new AssetsPlugin({path: path.join(__dirname, '..', 'public', 'assets')})
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      // Not all apps require jQuery. Many Rails apps do, such as those using TurboLinks or
      // bootstrap js
      {test: /\.scss$/, loader: 'style!css?sourceMap!autoprefixer!resolve-url!sass?sourceMap'},
      {test: require.resolve("jquery"), loader: "expose?$!expose?jQuery"},
      {test: require.resolve("lodash"), loader: "expose?_"},
      {test: require.resolve("sortablejs"), loader: "expose?Sortable"},
      {test: /\.html$/, loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './app')) + '/!html'}
    ]
  },
  devServer: {
    contentBase: 'http://localhost:3000'
  }
};
