var templateUrl = require('./targeting.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function TargetingController($state, sceneCollectionService, facebookTargetingSpecService) {
  var vm = this;

  vm.$onInit = function () {
    vm.targetingSpecs = [];
    vm.selectedTargetingSpecIds = [];
    vm.saving = false;

    fetchSceneCollection();
    fetchTargetingSpecs();
  };

  vm.selectTargetingSpec = selectTargetingSpec;
  vm.selected = selected;
  vm.saveTargeting = saveTargeting;

  function fetchSceneCollection() {
    sceneCollectionService.get({id: vm.sceneCollectionId}).then(function (data) {
      vm.selectedTargetingSpecIds = data.facebook_targeting_spec_ids;
    });
  }

  function fetchTargetingSpecs() {
    facebookTargetingSpecService.query().then(function (data) {
      vm.targetingSpecs = data;
    });
  }

  function selectTargetingSpec(targetingSpec) {
    vm.selectedTargetingSpecIds = [targetingSpec.id];
  }

  function selected(targetingSpec) {
    return _.includes(vm.selectedTargetingSpecIds, targetingSpec.id);
  }

  function saveTargeting() {
    vm.saving = true;

    sceneCollectionService.update({id: vm.sceneCollectionId}, {facebook_targeting_spec_ids: vm.selectedTargetingSpecIds}).then(function () {
      $state.go('sceneEditor', {sceneCollectionId: vm.sceneCollectionId});
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
