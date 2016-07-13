var themeSettings = angular.module('adsee.themeSettings', []);

themeSettings
  .component('themeSettings', require('./theme_settings.component'))
  .component('songPlayer', require('./song_player.component.js'))
  .service('songsService', require('./songs.service'));

module.exports = themeSettings.name;
