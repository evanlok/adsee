var sceneList = angular.module('adsee.sceneList', []);

sceneList
  .component('sceneList', require('./scene_list.component'))
  .component('horizontalScrollableList', require('./horizontal_scrollable_list.component'));

module.exports = sceneList.name;
