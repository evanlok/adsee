var facebookPostConfig = angular.module('adsee.facebookPostConfig', []);

facebookPostConfig
  .component('facebookPostConfig', require('./facebook_post_config.component'));

module.exports = facebookPostConfig.name;
