// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

// Filestack / Filepicker
var filepicker = require('filepicker-js');

var config = /*@ngInject*/ function ($stateProvider, $urlRouterProvider, $locationProvider, FILESTACK_API_KEY) {
  $stateProvider
    .state('sceneEditor', {
      url: '/scene_collections/:sceneCollectionId/edit',
      template: '<scene-editor></scene-editor>'
    })
    .state('sceneEditor.addScene', {
      url: '/add_scene',
      template: '<add-scene on-add-scene="$ctrl.addScene(scene)"></add-scene>'
    })
    .state('preview', {
      url: '/previews/:videoJobId',

      templateProvider: /*@ngInject*/ function ($stateParams) {
        return '<preview video-job-id="' + $stateParams.videoJobId + '">' + '</preview>';
      }
    });

  $locationProvider.html5Mode(true);

  filepicker.setKey(FILESTACK_API_KEY);
};

module.exports = config;
