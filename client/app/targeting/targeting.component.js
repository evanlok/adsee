var templateUrl = require('./targeting.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingController,
  bindings: {
    sceneCollection: '<'
  },
  require: {
    sceneCollectionWizard: '^^'
  }
};

/*@ngInject*/
function TargetingController($state, $q, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    vm.saving = false;
  };

  vm.saveTargeting = saveTargeting;

  function saveTargeting($event) {
    vm.saving = true;

    var adUpdatePromise = facebookAdService.save({sceneCollectionId: vm.sceneCollection.id}, {advanced: false});
    var scUpdatePromise = vm.sceneCollectionWizard.updateSceneCollection($event.sceneCollection);

    $q.all([adUpdatePromise, scUpdatePromise]).then(function () {
      $state.go('sceneEditor', {sceneCollectionId: vm.sceneCollection.id});
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
