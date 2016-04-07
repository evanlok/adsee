var themeSettings = angular.module('adsee.themeSettings', []);

themeSettings
  .component('themeSettings', require('./theme_settings.component'))
  .service('sceneCollectionService', require('./scene_collection.service'))
  .service('songsService', require('./songs.service'))
  .service('fontsService', require('./fonts.service'));

module.exports = themeSettings.name;
