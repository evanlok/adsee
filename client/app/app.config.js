// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

// Filestack / Filepicker
var filepicker = require('filepicker-js');

var config = /*@ngInject*/ function ($stateProvider, $urlRouterProvider, $locationProvider, FILESTACK_API_KEY) {
  $stateProvider
    .state('sceneEditor', {
      url: '/scene_collections/:sceneCollectionId/edit',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<scene-editor scene-collection-id="{{ sceneCollectionId }}"></scene-editor>')($stateParams);
      }
    })
    .state('sceneEditor.addScene', {
      url: '/add_scene',
      template: '<add-scene on-add-scene="$ctrl.addScene(scene)"></add-scene>'
    })
    .state('preview', {
      url: '/previews/:videoJobId',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<preview video-job-id="{{ videoJobId }}"></preview>')($stateParams);
      }
    });

  $locationProvider.html5Mode(true);

  filepicker.setKey(FILESTACK_API_KEY);
};

module.exports = config;
