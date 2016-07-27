var contentEditor = angular.module('adsee.contentEditor', []);

contentEditor
  .component('contentEditor', require('./content_editor.component'))
  .component('sceneAttribute', require('./scene_attribute.component'))
  .component('mediaAttribute', require('./media_attribute.component'))
  .component('iconAttribute', require('./icon_attribute.component'))
  .component('filterSelector', require('./scene_attribute_configuration/filter_selector.component'))
  .component('colorSettings', require('./scene_attribute_configuration/color_settings.component'))
  .component('videoSettings', require('./scene_attribute_configuration/video_settings.component'));

module.exports = contentEditor.name;
