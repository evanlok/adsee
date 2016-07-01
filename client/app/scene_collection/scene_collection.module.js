var sceneCollection = angular.module('adsee.sceneCollection', []);

sceneCollection
  .component('sceneCollectionEditor', require('./scene_collection_editor.component'))
  .directive('newSceneCollectionLink', require('./new_scene_collection_link.directive'));

module.exports = sceneCollection.name;
