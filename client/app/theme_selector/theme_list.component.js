var templateUrl = require('./theme_list.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeListController,
  bindings: {
    themes: '<',
    showAdType: '<',
    onSelect: '&?'
  }
};

function ThemeListController() {
  var vm = this;

  vm.$onInit = function () {
    vm.expandedTheme = {};
    vm.previewHeight = 0;
  };

  vm.expandTheme = expandTheme;
  vm.collapseTheme = collapseTheme;
  vm.styleForTheme = styleForTheme;
  vm.updatePreviewHeight = updatePreviewHeight;

  function expandTheme(theme) {
    vm.expandedTheme = theme;
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

  function updatePreviewHeight($event) {
    vm.previewHeight = $event.height;
  }
}

module.exports = component;
