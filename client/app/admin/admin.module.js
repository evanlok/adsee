var admin = angular.module('adsee.admin', []);

admin
  .component('uploadMediaButton', require('./upload_media_button.component'))
  .component('formColorPicker', require('./form_color_picker.component'));

module.exports = admin.name;
