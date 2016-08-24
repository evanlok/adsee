import audienceManagement from './audience_management/audience_management.module';

var targeting = angular.module('adsee.targeting', [
  audienceManagement
]);

targeting
  .component('basicTargetingForm', require('./basic_targeting_form.component'))
  .component('advancedTargetingLocationsForm', require('./advanced_targeting_locations_form.component'))
  .component('advancedTargetingDemographicsForm', require('./advanced_targeting_demographics_form.component'))
  .component('targeting', require('./targeting.component'))
  .component('targetingLocations', require('./targeting_locations.component'))
  .component('targetingDemographics', require('./targeting_demographics.component'))
  .component('targetingConnections', require('./targeting_connections.component'))
  .component('reachEstimate', require('./reach_estimate.component'));

module.exports = targeting.name;
