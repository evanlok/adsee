var targeting = angular.module('adsee.targeting', []);

targeting
  .component('targeting', require('./targeting.component'))
  .component('targetingLocations', require('./targeting_locations.component'));

module.exports = targeting.name;
