var sceneEditor = angular.module('adsee.sceneEditor', []);

sceneEditor
  .component('sceneEditor', require('./scene_editor.component'))
  .service('sceneCollectionService', require('./scene_collection.service.js'));

module.exports = sceneEditor.name;
