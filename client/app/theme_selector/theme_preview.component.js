var templateUrl = require('./theme_preview.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemePreviewController,
  bindings: {
    theme: '<',
    onOpen: '&',
    onClose: '&'
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

  function onOutputHeight(height) {
    vm.onOpen({$event: {height: height}});
  }

  function selectThemeVariant(themeVariant) {
    vm.themeVariant = themeVariant;
  }
}

module.exports = component;
