var templateUrl = require('./wizard_breadcrumbs.html');

var component = {
  templateUrl: templateUrl,
  controller: WizardBreadcrumbsController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function WizardBreadcrumbsController($state, $window, videoJobService, facebookAdService) {
  var vm = this;

  vm.stateName = stateName;
  vm.goToPreview = goToPreview;
  vm.goToAdConfig = goToAdConfig;
  
  function stateName() {
    return $state.current.name;
  }

  function goToPreview() {
    videoJobService.query({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      // Need to redirect to non-ssl host for preview streaming
      //$state.go('preview', {videoJobId: data[0].id});
      var hostWithPort = $window.location.hostname + ($window.location.port ? ':' + $window.location.port : '');
      $window.location = 'http://' + hostWithPort + '/scene_collections/' + vm.sceneCollectionId + '/previews/' + data[0].id;
    });
  }

  function goToAdConfig() {
    facebookAdService.save({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      $state.go('adConfig', {facebookAdId: data.id});
    });
  }
}

module.exports = component;
