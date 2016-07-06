var templateUrl = require('./wizard_breadcrumbs.html');

var component = {
  templateUrl: templateUrl,
  controller: WizardBreadcrumbsController,
  bindings: {
    sceneCollection: '<'
  }
};

/*@ngInject*/
function WizardBreadcrumbsController($state, videoJobService, facebookAdService) {
  var vm = this;

  vm.stateName = stateName;
  vm.goToTargeting = goToTargeting;
  vm.goToPreview = goToPreview;
  vm.goToAdConfig = goToAdConfig;
  vm.showFacebookAdLinks = showFacebookAdLinks;
  vm.showFacebookPostConfigLink = showFacebookPostConfigLink;

  function stateName() {
    return $state.current.name;
  }
  
  function goToTargeting() {
    if (vm.sceneCollection.advanced_targeting) {
      $state.go('targetingLocations');
    } else {
      $state.go('targeting');
    }
  }

  function goToPreview() {
    videoJobService.query({sceneCollectionId: vm.sceneCollection.id}).then(function (data) {
      $state.go('preview', {videoJobId: data[0].id});
    });
  }

  function goToAdConfig() {
    facebookAdService.save({sceneCollectionId: vm.sceneCollection.id}).then(function (data) {
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
