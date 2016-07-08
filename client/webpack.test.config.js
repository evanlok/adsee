var config = require('./webpack.base.config');

// Source map
config.devtool = 'inline-source-map';

config.entry = {};
config.output = {};

// Reset plugins
config.plugins = [];

module.exports = config;
