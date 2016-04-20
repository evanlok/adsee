var preview = angular.module('adsee.preview', []);

preview
  .component('preview', require('./preview.component'))
  .component('videoPreview', require('./video_preview.component'));

module.exports = preview.name;
