var templateUrl = require('./basic_targeting_form.html');

var component = {
  templateUrl: templateUrl,
  controller: BasicTargetingFormController,
  bindings: {
    sceneCollection: '<',
    advancedTargetingDisabled: '<?',
    saving: '<',
    onSave: '&'
  }
};

/*@ngInject*/
function BasicTargetingFormController(facebookTargetingSpecService) {
  var vm = this;

  vm.$onInit = function () {
    vm.targetingSpecs = [];

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
  vm.save = save;

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

  function save() {
    var sceneCollection = {
      facebook_targeting_spec_ids: vm.selectedTargetingSpecIds,
      zip_codes: vm.zipCodes
    };

    vm.onSave({$event: {sceneCollection: sceneCollection}});
  }
}

module.exports = component;
