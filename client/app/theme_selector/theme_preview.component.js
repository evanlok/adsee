var templateUrl = require('./theme_preview.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemePreviewController,
  bindings: {
    theme: '<',
    onOpen: '&',
    onClose: '&'
  },
  require: {
    themeList: '^^'
  }
};

/*@ngInject*/
function ThemePreviewController() {
  var vm = this;

  vm.$onInit = function () {
    vm.themeVariant = vm.theme.theme_variants[0];
  };

  vm.onOutputHeight = onOutputHeight;
  vm.selectThemeVariant = selectThemeVariant;
  vm.buildThemeVariant = buildThemeVariant;

  function onOutputHeight(height) {
    vm.onOpen({$event: {height: height}});
  }

  function selectThemeVariant(themeVariant) {
    vm.themeVariant = themeVariant;
  }

  function buildThemeVariant(themeVariant) {
    var payload = {themeVariant: themeVariant};
    vm.themeList.onSelect({$event: payload});
  }
}

module.exports = component;
