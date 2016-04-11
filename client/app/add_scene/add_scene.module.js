var addScene = angular.module('adsee.addScene', []);

addScene
  .component('addScene', require('./add_scene.component'))
  .service('sceneService', require('./scene.service'));

module.exports = addScene.name;
