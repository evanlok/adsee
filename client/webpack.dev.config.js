var webpack = require('webpack');
var config = require('./webpack.base.config');

// Loaders
config.module.loaders.push({test: /\.scss$/, loader: 'style!css?sourceMap!postcss!resolve-url!sass?sourceMap!import-glob'});

// Source map
config.devtool = 'cheap-module-eval-source-map';

// webpack-dev-server config
config.devServer = {
  contentBase: 'http://localhost:3000'
};

module.exports = config;
