var templateUrl = require('./theme_recommendation_group_form.html');
var toastr = require('toastr');

var component = {
  templateUrl: templateUrl,
  controller: ThemeRecommendationGroupFormController,
  bindings: {}
};

/*@ngInject*/
function ThemeRecommendationGroupFormController($window, themeRecommendationGroupService, industryService, adTypeService,
                                                themeService) {
  var vm = this;

  vm.$onInit = function () {
    vm.themeRecommendationGroup = {};
    vm.saving = false;
    fetchIndustries();
  };

  vm.industryChanged = industryChanged;
  vm.adTypeChanged = adTypeChanged;
  vm.save = save;

  function fetchIndustries() {
    return industryService.query().then(function (data) {
      vm.industries = data;
    });
  }

  function fetchAdTypes() {
    return adTypeService.query({industryId: vm.themeRecommendationGroup.industry_id}).then(function (data) {
      vm.adTypes = data;
    });
  }

  function fetchTargetingSpecs() {
    return themeRecommendationGroupService.availableTargetingSpecs({ad_type_id: vm.themeRecommendationGroup.ad_type_id}).then(function (data) {
      vm.facebookTargetingSpecs = data;
    });
  }

  function fetchThemes() {
    return themeService.query({ad_type_id: vm.themeRecommendationGroup.ad_type_id}).then(function (data) {
      vm.themes = data;
    });
  }

  function industryChanged() {
    delete vm.themeRecommendationGroup.ad_type_id;
    delete vm.themeRecommendationGroup.facebook_targeting_spec_id;
    delete vm.themeRecommendationGroup.theme_ids;
    fetchAdTypes();
  }

  function adTypeChanged() {
    delete vm.themeRecommendationGroup.facebook_targeting_spec_id;
    delete vm.themeRecommendationGroup.theme_ids;
    fetchTargetingSpecs();
    fetchThemes();
  }

  function save() {
    vm.saving = true;

    themeRecommendationGroupService.save({}, vm.themeRecommendationGroup).then(function () {
      $window.location = '/admin/theme_recommendation_groups';
    }, function onError(response) {
      toastr.error(response.data.errors.join(', '), 'Record could not be saved');
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
