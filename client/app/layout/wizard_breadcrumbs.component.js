var templateUrl = require('./wizard_breadcrumbs.html');

var component = {
  templateUrl: templateUrl,
  controller: WizardBreadcrumbsController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function WizardBreadcrumbsController($state, videoJobService, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    console.log($state)
  };

  vm.stateName = stateName;
  vm.goToPreview = goToPreview;
  vm.goToAdConfig = goToAdConfig;
  
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
}

module.exports = component;
