var Plotly = require('plotly.js/lib/core');

Plotly.register([
  require('plotly.js/lib/scatter'),
  require('plotly.js/lib/bar'),
  require('plotly.js/lib/choropleth')
]);

module.exports = Plotly;
