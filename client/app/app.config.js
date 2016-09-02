// Select2 defaults
$.fn.select2.defaults.set('theme', 'bootstrap');

// Filestack / Filepicker
var filepicker = require('filepicker-js');
var toastr = require('toastr');

var config = /*@ngInject*/ function ($stateProvider, $urlRouterProvider, $locationProvider, uiSelectConfig, FILESTACK_API_KEY,
                                     ezfbProvider, FACEBOOK_APP_ID) {
  $stateProvider
    .state('themeSelector', {
      url: '/theme_selector',
      template: '<theme-selector></theme-selector>'
    })
    .state('smartCreate', {
      url: '/smart_create',
      template: '<smart-create></smart-create>'
    })
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
    .state('audience', {
      url: '/audience',
      template: '<audience scene-collection="$ctrl.sceneCollection"></audience>',
      parent: 'sceneCollectionWizard'
    })
    .state('targeting', {
      url: '/targeting',
      template: '<targeting scene-collection="$ctrl.sceneCollection"></targeting>',
      parent: 'sceneCollectionWizard'
    })
    .state('themes', {
      url: '/themes',
      template: '<themes scene-collection="$ctrl.sceneCollection"></themes>',
      parent: 'sceneCollectionWizard'
    })
    .state('targetingLocations', {
      url: '/targeting/locations',
      template: '<targeting-locations scene-collection="$ctrl.sceneCollection"></targeting-locations>',
      parent: 'sceneCollectionWizard'
    })
    .state('targetingDemographics', {
      url: '/targeting/demographics',
      template: '<targeting-demographics scene-collection="$ctrl.sceneCollection"></targeting-demographics>',
      parent: 'sceneCollectionWizard'
    })
    .state('sceneEditor', {
      url: '/edit',
      template: '<scene-editor scene-collection="$ctrl.sceneCollection"></scene-editor>',
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
      template: '<ad-config facebook-ad="$resolve.facebookAd" scene-collection="$ctrl.sceneCollection"></ad-config>',
      resolve: {
        facebookAd: /*@ngInject */ function ($stateParams, facebookAdService) {
          return facebookAdService.get({id: $stateParams.facebookAdId});
        }
      },
      parent: 'sceneCollectionWizard'
    })
    .state('facebookPostConfig', {
      url: '/facebook_post',
      template: '<facebook-post-config scene-collection="$ctrl.sceneCollection"></facebook-post-config>',
      parent: 'sceneCollectionWizard'
    })
    .state('summary', {
      url: '/summary',
      template: '<summary scene-collection="$ctrl.sceneCollection"></summary>',
      parent: 'sceneCollectionWizard'
    })
    .state('profileReports', {
      url: '/reports?page',
      template: '<profile-report-list profile-reports="$resolve.profileReports" current-page="{{ $resolve.page }}"></profile-report-list>',
      resolve: {
        profileReports: /* @ngInject */ function ($stateParams, profileReportService) {
          return profileReportService.query({page: $stateParams.page});
        },
        page: /* @ngInject */ function ($stateParams) {
          return $stateParams.page;
        }
      }
    })
    .state('profileReport', {
      url: '/reports/:id',
      template: '<profile-report profile-report="$resolve.profileReport"></profile-report>',
      resolve: {
        profileReport: /* @ngInject */ function ($stateParams, profileReportService) {
          return profileReportService.get({id: $stateParams.id});
        }
      }
    })
    .state('adInsights', {
      url: '/ad_insights/:id',
      template: '<ad-insights facebook-ad="$resolve.facebookAd"></ad-insights>',
      resolve: {
        facebookAd: /* @ngInject */ function ($stateParams, facebookAdService) {
          return facebookAdService.get({id: $stateParams.id});
        }
      }
    });

  $locationProvider.html5Mode(true);

  uiSelectConfig.theme = 'bootstrap';

  filepicker.setKey(FILESTACK_API_KEY);

  ezfbProvider.setInitParams({
    appId: FACEBOOK_APP_ID
  });

  toastr.options.positionClass = 'toast-top-full-width';
};

module.exports = config;
