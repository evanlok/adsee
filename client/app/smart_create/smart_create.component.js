var templateUrl = require('./smart_create.html');

var component = {
  templateUrl: templateUrl,
  controller: SmartCreateController,
  bindings: {}
};

/*@ngInject*/
function SmartCreateController($state, industryService, adTypeService, facebookTargetingSpecService, sceneCollectionService) {
  var vm = this;

  vm.$onInit = function () {
    vm.config = {};
    vm.step = 1;
    vm.recommendedThemesAvailable = true;
    fetchIndustries();
    fetchFacebookTargetingSpecs();
  };

  vm.selectIndustry = selectIndustry;
  vm.selectAdType = selectAdType;
  vm.selectIntegrationType = selectIntegrationType;
  vm.goToStep = goToStep;
  vm.previousStep = previousStep;

  function fetchIndustries() {
    industryService.query().then(function (data) {
      vm.industries = data;
    });
  }

  function fetchFacebookTargetingSpecs() {
    facebookTargetingSpecService.query().then(function (data) {
      vm.facebookTargetingSpecs = data;
    });
  }

  function fetchAdTypes() {
    adTypeService.query({industry_id: vm.config.industry.id}).then(function (data) {
      vm.adTypes = data;
    });
  }

  function selectIndustry(industry) {
    vm.config.industry = industry;
    vm.step = 2;
    fetchAdTypes();
  }

  function selectAdType(adType) {
    vm.config.adType = adType;
    vm.step = 3;
  }

  function selectIntegrationType($event) {
    if (vm.saving) {
      return;
    }

    vm.saving = true;

    sceneCollectionService.save({}, {ad_type_id: vm.config.adType.id, integration: $event.type}).then(function (data) {
      $state.go('audience', {sceneCollectionId: data.id});
    }).finally(function () {
      vm.saving = false;
    });
  }

  function goToStep(step) {
    vm.step = step;
  }

  function previousStep() {
    if (vm.step > 1) {
      vm.step--;
    }
  }
}

module.exports = component;
