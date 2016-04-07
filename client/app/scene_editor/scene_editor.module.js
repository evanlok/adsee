var sceneEditor = angular.module('adsee.sceneEditor', []);

sceneEditor
  .component('sceneEditor', require('./scene_editor.component'));

module.exports = sceneEditor.name;
