var templateUrl = require('./wizard_breadcrumbs.html');

var component = {
  templateUrl: templateUrl,
  controller: WizardBreadcrumbsController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function WizardBreadcrumbsController($state, videoJobService, facebookAdService, sceneCollectionService) {
  var vm = this;

  vm.$onInit = function () {
    vm.sceneCollection = {};

    fetchSceneCollection();
  };

  vm.stateName = stateName;
  vm.goToPreview = goToPreview;
  vm.goToAdConfig = goToAdConfig;
  vm.showFacebookAdLinks = showFacebookAdLinks;
  vm.showFacebookPostConfigLink = showFacebookPostConfigLink;

  function fetchSceneCollection() {
    sceneCollectionService.get({id: vm.sceneCollectionId}).then(function (data) {
      vm.sceneCollection = data;
    });
  }

  function stateName() {
    return $state.current.name;
  }

  function goToPreview() {
    videoJobService.query({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      $state.go('preview', {videoJobId: data[0].id});
    });
  }

  function goToAdConfig() {
    facebookAdService.save({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      $state.go('adConfig', {facebookAdId: data.id});
    });
  }

  function showFacebookAdLinks() {
    return vm.sceneCollection.integration === 'facebook_ad';
  }

  function showFacebookPostConfigLink() {
    return _.includes(['facebook_post', 'facebook_page_post'], vm.sceneCollection.integration);
  }
}

module.exports = component;
