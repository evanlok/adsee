var mediaLibrary = angular.module('adsee.mediaLibrary', []);

mediaLibrary
  .component('mediaLibrary', require('./media_library.component'))
  .service('imageService', require('./image.service'))
  .service('videoClipService', require('./video_clip.service'))
  .service('uploaderService', require('./uploader.service'));

module.exports = mediaLibrary.name;
