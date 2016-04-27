var adConfig = angular.module('adsee.adConfig', []);

adConfig
  .component('adConfig', require('./ad_config.component'));

module.exports = adConfig.name;
