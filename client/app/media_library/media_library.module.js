var mediaLibrary = angular.module('mediaLibrary', []);

mediaLibrary
  .component('mediaLibrary', require('./media_library.component'))
  .service('imageService', require('./image.service'))
  .service('uploaderService', require('./uploader.service'));

module.exports = mediaLibrary.name;
