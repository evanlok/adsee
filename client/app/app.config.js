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
      template: '<scene-collection-wizard scene-collection="$resolve.sceneCollection"></scene-collection-wizard>',
      resolve: {
        sceneCollection: /*@ngInject */ function ($stateParams, sceneCollectionService) {
          return sceneCollectionService.get({id: $stateParams.sceneCollectionId});
        }
      }
    })
    .state('targeting', {
      url: '/targeting',
      template: '<targeting scene-collection="$resolve.sceneCollection"></targeting>',
      parent: 'sceneCollectionWizard'
    })
    .state('targetingLocations', {
      url: '/targeting/locations',
      template: '<targeting-locations scene-collection="$resolve.sceneCollection"></targeting-locations>',
      parent: 'sceneCollectionWizard'
    })
    .state('targetingDemographics', {
      url: '/targeting/demographics',
      template: '<targeting-demographics scene-collection="$resolve.sceneCollection"></targeting-demographics>',
      parent: 'sceneCollectionWizard'
    })
    .state('sceneEditor', {
      url: '/edit',
      template: '<scene-editor scene-collection="$resolve.sceneCollection"></scene-editor>',
      parent: 'sceneCollectionWizard'
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
      template: '<facebook-post-config scene-collection="$resolve.sceneCollection"></facebook-post-config>',
      parent: 'sceneCollectionWizard'
    })
    .state('summary', {
      url: '/summary',
      template: '<summary scene-collection="$resolve.sceneCollection"></summary>',
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
