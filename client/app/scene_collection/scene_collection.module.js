var sceneCollection = angular.module('adsee.sceneCollection', []);

sceneCollection
  .directive('newSceneCollectionLink', require('./new_scene_collection_link.directive'))
  .service('stepNavigator', require('./step_navigator.service'));

module.exports = sceneCollection.name;
