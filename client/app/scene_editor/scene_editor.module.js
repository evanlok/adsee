var sceneEditor = angular.module('adsee.sceneEditor', []);

sceneEditor
  .component('sceneEditor', require('./scene_editor.component'))
  .service('transitionsService', require('./transitions.service'));

module.exports = sceneEditor.name;
