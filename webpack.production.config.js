var webpack = require('webpack');
var config = require('./webpack.config');

// Use this setting when compiling assets for production
config.output.publicPath = '/assets/webpack/';

// Add hash to output file
config.output.filename = '[name]-bundle-[hash].js';

// Optimizations
config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());

// Source map
config.devtool = 'source-map';
config.output.pathinfo = false;

module.exports = config;
