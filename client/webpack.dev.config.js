var webpack = require('webpack');
var config = require('./webpack.base.config');

// Loaders
config.module.loaders.push({test: /\.scss$/, loader: 'style!css?sourceMap!autoprefixer!resolve-url!sass?sourceMap'});

// Source map
config.devtool = 'eval';

// webpack-dev-server config
config.devServer = {
  contentBase: 'http://localhost:3000'
};

module.exports = config;
