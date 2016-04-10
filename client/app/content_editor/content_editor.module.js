var contentEditor = angular.module('contentEditor', []);

contentEditor
  .component('contentEditor', require('./content_editor.component'))
  .component('sceneAttribute', require('./scene_attribute.component'));

module.exports = contentEditor.name;
