var targeting = angular.module('adsee.targeting', []);

targeting
  .component('targeting', require('./targeting.component'))
  .component('targetingLocations', require('./targeting_locations.component'))
  .component('targetingDemographics', require('./targeting_demographics.component'))
  .component('targetingConnections', require('./targeting_connections.component'))
  .component('reachEstimate', require('./reach_estimate.component'));

module.exports = targeting.name;
