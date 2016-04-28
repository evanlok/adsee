var shared = angular.module('adsee.shared', []);

shared
  .component('videoPlayer', require('./video_player.component'))
  .directive('videoOverlayLink', require('./video_overlay_link.directive'));


module.exports = shared.name;
