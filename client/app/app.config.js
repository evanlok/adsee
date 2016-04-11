// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

var config = function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
};

module.exports = config;
