var templateUrl = require('./theme_recommendation_form.html');
var toastr = require('toastr');

var component = {
  templateUrl: templateUrl,
  controller: ThemeRecommendationFormController,
  bindings: {
    themeRecommendationId: '@'
  }
};

/*@ngInject*/
function ThemeRecommendationFormController($window, themeRecommendationService, industryService, adTypeService,
                                           facebookTargetingSpecService, themeService) {
  var vm = this;

  vm.$onInit = function () {
    vm.saving = false;
    if (vm.themeRecommendationId) {
      fetchThemeRecommendation().then(function () {
        fetchIndustries();
        fetchAdTypes();
        fetchThemes();
      });
    } else {
      fetchIndustries();
    }

    fetchFacebookTargetingSpecs();
  };

  vm.industryChanged = industryChanged;
  vm.fetchAvailableThemes = fetchAvailableThemes;
  vm.save = save;

  function fetchThemeRecommendation() {
    return themeRecommendationService.get({id: vm.themeRecommendationId}).then(function (data) {
      vm.themeRecommendation = data;
    });
  }

  function fetchIndustries() {
    return industryService.query().then(function (data) {
      vm.industries = data;
    });
  }

  function fetchAdTypes() {
    return adTypeService.query({industryId: vm.themeRecommendation.industry_id}).then(function (data) {
      vm.adTypes = data;
    });
  }

  function fetchThemes() {
    return themeService.query({adTypeId: vm.themeRecommendation.ad_type_id}).then(function (data) {
      vm.themes = data;
    });
  }

  function fetchAvailableThemes() {
    if (!vm.themeRecommendation.ad_type_id || !vm.themeRecommendation.facebook_targeting_spec_id) {
      vm.themes = [];
    } else {
      themeRecommendationService.availableThemes({
        ad_type_id: vm.themeRecommendation.ad_type_id,
        facebook_targeting_spec_id: vm.themeRecommendation.facebook_targeting_spec_id
      }).then(function (data) {
        vm.themes = data;
      });
    }
  }

  function fetchFacebookTargetingSpecs() {
    return facebookTargetingSpecService.query().then(function (data) {
      vm.facebookTargetingSpecs = data;
    });
  }

  function industryChanged() {
    fetchAdTypes();
  }

  function save() {
    vm.saving = true;

    themeRecommendationService.save({}, vm.themeRecommendation).then(function () {
      $window.location = '/admin/theme_recommendations';
    }, function onError(response) {
      toastr.error(response.data.errors, 'Record could not be saved');
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
