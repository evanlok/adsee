var templateUrl = require('./theme_browser.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeBrowserController,
  bindings: {}
};

/*@ngInject*/
function ThemeBrowserController($q, $document, $window, industryService, themeService) {
  var vm = this;

  vm.$onInit = function () {
    vm.loading = true;
    vm.queryParams = {};
    vm.expandedTheme = {};
    vm.previewHeight = 0;

    $q.all([fetchIndustries(), fetchThemes()]).then(function () {
      vm.loading = false;
    });
  };

  vm.selectedIndustry = selectedIndustry;
  vm.selectIndustry = selectIndustry;
  vm.title = title;
  vm.showFeaturedThemes = showFeaturedThemes;
  vm.active = active;
  vm.expandTheme = expandTheme;
  vm.collapseTheme = collapseTheme;
  vm.styleForTheme = styleForTheme;
  vm.updatePreviewHeight = updatePreviewHeight;
  vm.selectTheme = selectTheme;

  function fetchIndustries() {
    return industryService.query().then(function (data) {
      vm.industries = data;
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

  function expandTheme(theme) {
    vm.expandedTheme = theme;
    //var element = angular.element(document.getElementById('theme_' + theme.id));
    //$document.scrollTo(element, 10);
  }

  function collapseTheme() {
    vm.expandedTheme = {};
  }

  function styleForTheme(theme) {
    if (theme === vm.expandedTheme) {
      var height = vm.previewHeight + 40;
      return {'margin-bottom': height + 'px'};
    } else {
      return {};
    }
  }

  function updatePreviewHeight (height) {
    vm.previewHeight = height;
  }

  function selectTheme(theme) {
    $window.location = '/themes/' + theme.id;
  }
}

module.exports = component;
