// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

// Filestack / Filepicker
var filepicker = require('filepicker-js');

var config = /*@ngInject*/ function ($stateProvider, $urlRouterProvider, $locationProvider, FILESTACK_API_KEY) {
  $stateProvider
    .state('targeting', {
      url: '/scene_collections/:sceneCollectionId/targeting',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<targeting scene-collection-id="{{ sceneCollectionId }}"></targeting>')($stateParams);
      }
    })
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
    })
    .state('adConfig', {
      url: '/ad_config/:facebookAdId',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<ad-config facebook-ad-id="{{ facebookAdId }}"></ad-config>')($stateParams);
      }
    })
    .state('summary', {
      url: '/scene_collections/:sceneCollectionId/summary',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<summary scene-collection-id="{{ sceneCollectionId }}"></summary>')($stateParams);
      }
    });

  $locationProvider.html5Mode(true);

  filepicker.setKey(FILESTACK_API_KEY);
};

module.exports = config;
