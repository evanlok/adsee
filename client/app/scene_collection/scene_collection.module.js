var sceneCollection = angular.module('adsee.sceneCollection', []);

sceneCollection
  .directive('newSceneCollectionLink', require('./new_scene_collection_link.directive'))

module.exports = sceneCollection.name;
