var sceneEditor = angular.module('adsee.sceneEditor', [require('./transition/transition.module')]);

sceneEditor
  .component('sceneEditor', require('./scene_editor.component'));

module.exports = sceneEditor.name;
