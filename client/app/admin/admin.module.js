var admin = angular.module('adsee.admin', [
  require('./theme_recommendation_group/theme_recommendation_group.module')
]);

admin
  .component('uploadMediaButton', require('./upload_media_button.component'))
  .component('formColorPicker', require('./form_color_picker.component'));

module.exports = admin.name;
