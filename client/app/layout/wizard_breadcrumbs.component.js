var templateUrl = require('./wizard_breadcrumbs.html');

var component = {
  templateUrl: templateUrl,
  controller: WizardBreadcrumbsController,
  bindings: {
    sceneCollection: '<'
  }
};

/*@ngInject*/
function WizardBreadcrumbsController($state, stepsNavigator) {
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
    stepsNavigator.goToTargeting(vm.sceneCollection);
  }

  function goToPreview() {
    stepsNavigator.goToPreview(vm.sceneCollection);
  }

  function goToAdConfig() {
    stepsNavigator.goToAdConfig(vm.sceneCollection);
  }

  function showFacebookAdLinks() {
    return vm.sceneCollection.integration === 'facebook_ad';
  }

  function showFacebookPostConfigLink() {
    return _.includes(['facebook_post', 'facebook_page_post'], vm.sceneCollection.integration);
  }
}

module.exports = component;
