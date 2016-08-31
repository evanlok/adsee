var webpack = require('webpack');
var config = require('./webpack.base.config');
var path = require('path');
var jsyaml = require('js-yaml');
var fs = require('fs');
var _ = require('lodash');

// Load ENV variables from application.yml
var doc = jsyaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'config', 'application.yml')));

_.each(doc, function (value, key) {
  process.env[key] = value;
});

// Loaders
config.module.loaders.push({test: /\.scss$/, loader: 'style!css?sourceMap!postcss!resolve-url!sass?sourceMap!import-glob'});

// Source map
config.devtool = 'cheap-module-eval-source-map';

// webpack-dev-server config
config.devServer = {
  contentBase: 'http://localhost:3000'
};

module.exports = config;
