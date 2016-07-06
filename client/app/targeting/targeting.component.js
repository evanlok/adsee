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
function TargetingController($state, $q, facebookTargetingSpecService, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    vm.targetingSpecs = [];
    vm.saving = false;

    fetchTargetingSpecs();
  };

  vm.$onChanges = function (changes) {
    if (changes.sceneCollection) {
      vm.selectedTargetingSpecIds = vm.sceneCollection.facebook_targeting_spec_ids;
      vm.zipCodes = vm.sceneCollection.zip_codes;
    }
  };

  vm.selectTargetingSpec = selectTargetingSpec;
  vm.selected = selected;
  vm.saveTargeting = saveTargeting;

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

    var adUpdatePromise = facebookAdService.save({sceneCollectionId: vm.sceneCollection.id}, {advanced: false});
    var scUpdatePromise = vm.sceneCollectionWizard.updateSceneCollection({id: vm.sceneCollection.id}, {
      sceneCollection: {
        facebook_targeting_spec_ids: vm.selectedTargetingSpecIds,
        zip_codes: vm.zipCodes
      }
    });

    $q.all([adUpdatePromise, scUpdatePromise]).then(function () {
      $state.go('sceneEditor', {sceneCollectionId: vm.sceneCollection.id});
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
