var templateUrl = require('./targeting.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function TargetingController($state, $q, sceneCollectionService, facebookTargetingSpecService, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    vm.targetingSpecs = [];
    vm.selectedTargetingSpecIds = [];
    vm.saving = false;
    vm.zipCodes = [];

    fetchSceneCollection();
    fetchTargetingSpecs();
  };

  vm.selectTargetingSpec = selectTargetingSpec;
  vm.selected = selected;
  vm.saveTargeting = saveTargeting;

  function fetchSceneCollection() {
    sceneCollectionService.get({id: vm.sceneCollectionId}).then(function (data) {
      vm.selectedTargetingSpecIds = data.facebook_targeting_spec_ids;
      vm.zipCodes = data.zip_codes;
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

    var adUpdatePromise = facebookAdService.save({sceneCollectionId: vm.sceneCollectionId}, {advanced: false});
    var scUpdatePromise = sceneCollectionService.update({id: vm.sceneCollectionId}, {
      facebook_targeting_spec_ids: vm.selectedTargetingSpecIds,
      zip_codes: vm.zipCodes
    });

    // Publish event for breadcrumbs nav update
    sceneCollectionService.targetingTypeChanged('basic');

    $q.all([adUpdatePromise, scUpdatePromise]).then(function () {
      $state.go('sceneEditor', {sceneCollectionId: vm.sceneCollectionId});
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
