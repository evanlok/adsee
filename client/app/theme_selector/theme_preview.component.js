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

  function onOutputHeight(height) {
    vm.onOpen({$event: {height: height}});
  }
}

module.exports = component;
