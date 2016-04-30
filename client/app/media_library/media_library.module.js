var mediaLibrary = angular.module('adsee.mediaLibrary', []);

mediaLibrary
  .component('mediaLibrary', require('./media_library.component'))

module.exports = mediaLibrary.name;
