var webpack = require('webpack');
var config = require('./webpack.base.config');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Use this setting when compiling assets for production
config.output.publicPath = '/assets/webpack/';

// Add hash to output file
config.output.filename = '[name]-bundle-[hash].js';

// Optimizations
config.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!resolve-url!sass?sourceMap")
});

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(new ExtractTextPlugin("[name]-[contenthash].css", {allChunks: true}));

// Source map
config.devtool = 'source-map';
config.output.pathinfo = false;

module.exports = config;
