var summary = angular.module('adsee.summary', []);

summary
  .component('summary', require('./summary.component'));

module.exports = summary.name;
