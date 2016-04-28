var targeting = angular.module('adsee.targeting', []);

targeting
  .component('targeting', require('./targeting.component'));

module.exports = targeting.name;
