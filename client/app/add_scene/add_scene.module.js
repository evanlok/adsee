var addScene = angular.module('adsee.addScene', []);

addScene
  .component('addScene', require('./add_scene.component'));

module.exports = addScene.name;
