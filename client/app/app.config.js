// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

// Filestack / Filepicker
var filepicker = require('filepicker-js');

var config = /*@ngInject*/ function ($stateProvider, $urlRouterProvider, $locationProvider, uiSelectConfig, FILESTACK_API_KEY,
                                     ezfbProvider, FACEBOOK_APP_ID) {
  $stateProvider
    .state('sceneCollectionWizard', {
      abstract: true,
      url: '/scene_collections/:sceneCollectionId',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<scene-collection-wizard scene-collection-id="{{ sceneCollectionId }}"></scene-collection-wizard>')($stateParams);
      }
    })
    .state('targeting', {
      url: '/targeting',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<targeting scene-collection-id="{{ sceneCollectionId }}"></targeting>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    })
    .state('targetingLocations', {
      url: '/targeting/locations',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<targeting-locations scene-collection-id="{{ sceneCollectionId }}"></targeting-locations>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    })
    .state('targetingDemographics', {
      url: '/targeting/demographics',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<targeting-demographics scene-collection-id="{{ sceneCollectionId }}"></targeting-demographics>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    })
    .state('sceneCollectionEditor', {
      abstract: true,
      url: '/edit',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<scene-collection-editor scene-collection-id="{{ sceneCollectionId }}"></scene-collection-editor>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    })
    .state('sceneEditor', {
      url: '',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<scene-editor scene-collection="$ctrl.sceneCollection" scene-contents="$ctrl.sceneContents" selected-scene-content="$ctrl.selectedSceneContent"></scene-editor>')($stateParams);
      },
      parent: 'sceneCollectionEditor'
    })
    .state('addScene', {
      url: '/add_scene',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<add-scene aspect-ratio="{{ $ctrl.sceneCollection.aspect_ratio }}" on-add-scene="$ctrl.addScene(scene)"></add-scene>')($stateParams);
      },
      parent: 'sceneCollectionEditor'
    })
    .state('mediaLibrary', {
      url: '/media_library',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<media-library></media-library>')($stateParams);
      },
      parent: 'sceneCollectionEditor'
    })
    .state('preview', {
      url: '/previews/:videoJobId',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<preview video-job-id="{{ videoJobId }}"></preview>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    })
    .state('adConfig', {
      url: '/ad_config/:facebookAdId',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<ad-config facebook-ad-id="{{ facebookAdId }}"></ad-config>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    })
    .state('facebookPostConfig', {
      url: '/facebook_post',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<facebook-post-config scene-collection-id="{{ sceneCollectionId }}"></facebook-post-config>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    })
    .state('summary', {
      url: '/summary',
      templateProvider: /*@ngInject */ function ($stateParams, $interpolate) {
        return $interpolate('<summary scene-collection-id="{{ sceneCollectionId }}"></summary>')($stateParams);
      },
      parent: 'sceneCollectionWizard'
    });

  $locationProvider.html5Mode(true);

  uiSelectConfig.theme = 'bootstrap';

  filepicker.setKey(FILESTACK_API_KEY);

  ezfbProvider.setInitParams({
    appId: FACEBOOK_APP_ID
  });
};

module.exports = config;
