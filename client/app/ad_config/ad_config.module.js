var adConfig = angular.module('adsee.adConfig', []);

adConfig
  .component('adConfig', require('./ad_config.component'))
  .component('adThumbnailUploader', require('./ad_thumbnail_uploader.component'));

module.exports = adConfig.name;
