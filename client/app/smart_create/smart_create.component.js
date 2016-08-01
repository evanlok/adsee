var templateUrl = require('./smart_create.html');

var component = {
  templateUrl: templateUrl,
  controller: SmartCreateController,
  bindings: {}
};

/*@ngInject*/
function SmartCreateController($window, industryService, adTypeService, facebookTargetingSpecService, themeService) {
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
  vm.selectTargetingSpec = selectTargetingSpec;
  vm.selectTheme = selectTheme;
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
    adTypeService.query({industryId: vm.config.industry.id}).then(function (data) {
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

  function selectTargetingSpec(targetingSpec) {
    vm.config.targetingSpec = targetingSpec;
    vm.step = 4;
    fetchThemes();
  }

  function fetchThemes() {
    vm.themes = [];
    vm.recommendedThemesAvailable = true;

    themeService.recommended({
      ad_type_id: vm.config.adType.id,
      facebook_targeting_spec_id: vm.config.targetingSpec.id
    }).then(function (data) {
      vm.themes = data;
    }).then(function () {
      if (_.isEmpty(vm.themes)) {
        vm.recommendedThemesAvailable = false;

        themeService.query({adTypeId: vm.config.adType.id}).then(function (data) {
          vm.themes = data;
        });
      }
    });
  }

  function selectTheme(theme) {
    $window.location = '/themes/' + theme.id;
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
