import facebookIntegrationTypes from './facebook_integration_types.component';

var sceneCollection = angular.module('adsee.sceneCollection', []);

sceneCollection
  .component('facebookIntegrationTypes', facebookIntegrationTypes)
  .directive('newSceneCollectionLink', require('./new_scene_collection_link.directive'));

module.exports = sceneCollection.name;
