var shared = angular.module('adsee.shared', []);

shared
  .component('videoPlayer', require('./video_player.component'))
  .directive('videoOverlayLink', require('./video_overlay_link.directive'))
  .filter('secondsToTime', require('./seconds_to_time.filter'))
  .filter('underscoreless', require('./underscoreless.filter'));

module.exports = shared.name;
