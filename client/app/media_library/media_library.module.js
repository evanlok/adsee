var mediaLibrary = angular.module('adsee.mediaLibrary', []);

mediaLibrary
  .component('mediaLibrary', require('./media_library.component'))
  .component('imageList', require('./image_list.component'))
  .component('videoList', require('./video_list.component'));

module.exports = mediaLibrary.name;
