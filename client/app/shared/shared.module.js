var shared = angular.module('adsee.shared', []);

shared
  .component('videoPlayer', require('./video_player.component'))
  .component('adseeIcon', require('./icon.component'))
  .directive('videoOverlayLink', require('./video_overlay_link.directive'))
  .directive('ngFileInput', require('./ng_file_input.directive'))
  .filter('secondsToTime', require('./seconds_to_time.filter'))
  .filter('underscoreless', require('./underscoreless.filter'))
  .filter('titlecase', require('./titlecase.filter'))
  .service('modalConfig', require('./modal_config.service'));

module.exports = shared.name;
