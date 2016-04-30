var media = angular.module('adsee.media', []);

media
  .directive('uploadMediaLink', require('./upload_media_link.directive'))
  .service('uploaderService', require('./uploader.service'));

module.exports = media.name;
