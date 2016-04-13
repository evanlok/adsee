// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

// Filestack / Filepicker
var filepicker = require('filepicker-js');

var config = function ($stateProvider, $urlRouterProvider, $locationProvider, FILESTACK_API_KEY) {
  $stateProvider
    .state('sceneEditor', {
      url: '/scene_collections/:sceneCollectionId/edit',
      template: '<scene-editor></scene-editor>'
    })
    .state('sceneEditor.addScene', {
      url: '/add_scene',
      template: '<add-scene on-add-scene="$ctrl.addScene(scene)"></add-scene>'
    });

  $locationProvider.html5Mode(true);

  filepicker.setKey(FILESTACK_API_KEY);
};

module.exports = config;
