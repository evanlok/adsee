var sceneNavigator = angular.module('adsee.sceneNavigator', []);

sceneNavigator
  .component('sceneNavigator', require('./scene_navigator.component'));

module.exports = sceneNavigator.name;
