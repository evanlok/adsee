var contentEditor = angular.module('adsee.contentEditor', []);

contentEditor
  .component('contentEditor', require('./content_editor.component'))
  .component('sceneAttribute', require('./scene_attribute.component'))
  .component('mediaAttribute', require('./media_attribute.component'))
  .component('iconAttribute', require('./icon_attribute.component'));

module.exports = contentEditor.name;
