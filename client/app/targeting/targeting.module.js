import audienceManagement from './audience_management/audience_management.module';

var targeting = angular.module('adsee.targeting', [
  audienceManagement
]);

targeting
  .component('targeting', require('./targeting.component'))
  .component('targetingLocations', require('./targeting_locations.component'))
  .component('targetingDemographics', require('./targeting_demographics.component'))
  .component('targetingConnections', require('./targeting_connections.component'))
  .component('reachEstimate', require('./reach_estimate.component'));

module.exports = targeting.name;
