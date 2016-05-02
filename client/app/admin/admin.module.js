var admin = angular.module('adsee.admin', []);

admin
  .component('uploadMediaButton', require('./upload_media_button.component'));

module.exports = admin.name;
