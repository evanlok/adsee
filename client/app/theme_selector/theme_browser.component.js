var templateUrl = require('./theme_browser.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeBrowserController,
  bindings: {}
};

/*@ngInject*/
function ThemeBrowserController($q, $window, industryService, adTypeService, themeService) {
  var vm = this;

  vm.$onInit = function () {
    vm.loading = true;
    vm.queryParams = {};

    $q.all([fetchIndustries(), fetchAdTypes(), fetchThemes()]).then(function () {
      vm.loading = false;
    });
  };

  vm.selectedIndustry = selectedIndustry;
  vm.selectIndustry = selectIndustry;
  vm.adTypeFromId = adTypeFromId;
  vm.industryNameFromTheme = industryNameFromTheme;
  vm.title = title;
  vm.showFeaturedThemes = showFeaturedThemes;
  vm.active = active;
  vm.selectTheme = selectTheme;

  function fetchIndustries() {
    return industryService.query().then(function (data) {
      vm.industries = data;
    });
  }

  function fetchAdTypes() {
    return adTypeService.query().then(function (data) {
      vm.adTypes = data;
    });
  }

  function fetchThemes() {
    return themeService.query(vm.queryParams).then(function (data) {
      vm.themes = data;
    });
  }

  function selectedIndustry() {
    if (!_.isNil(vm.selectedIndustryIdx)) {
      return vm.industries[vm.selectedIndustryIdx];
    }
  }

  function selectIndustry(industry) {
    if (industry) {
      vm.queryParams = {industry_id: industry.id};
      vm.selectedIndustryIdx = _.indexOf(vm.industries, industry);

    } else {
      vm.queryParams = {};
    }

    vm.loading = true;

    fetchThemes().then(function () {
      vm.loading = false;
    });
  }

  function adTypeFromId(id) {
    return _.find(vm.adTypes, {id: id});
  }

  function industryNameFromTheme(theme) {
    var adType = adTypeFromId(theme.ad_type_id);
    return _.find(vm.industries, {id: adType.industry_id}).name;
  }

  function title() {
    if (vm.queryParams.industry_id) {
      return vm.selectedIndustry().name;
    } else if (vm.queryParams.featured) {
      return 'Featured';
    } else {
      return 'All';
    }
  }

  function showFeaturedThemes() {
    vm.queryParams = {featured: '1'};

    vm.loading = true;

    fetchThemes().then(function () {
      vm.loading = false;
    });
  }

  function active(category) {
    if (category === 'All') {
      return _.isEmpty(vm.queryParams);
    } else if (category === 'Featured') {
      return vm.queryParams.featured === '1';
    } else {
      return vm.queryParams.industry_id === category.id;
    }
  }

  function selectTheme(theme) {
    $window.location = '/themes/' + theme.id;
  }
}

module.exports = component;
