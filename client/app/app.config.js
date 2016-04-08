// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

var config = function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/scene_collections/:sceneCollectionId/edit', {
      template: '<scene-editor></scene-editor>'
    });

  $locationProvider.html5Mode(true);
};

module.exports = config;
