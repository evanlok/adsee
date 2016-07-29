var templateUrl = require('./color_settings.html');

var component = {
  templateUrl: templateUrl,
  controller: ColorSettingsController,
  bindings: {
    config: '<',
    onChange: '&'
  }
};

/*@ngInject*/
function ColorSettingsController(modalConfig) {
  var vm = this;

  vm.$onInit = function () {
    vm.sliderOptions = {
      floor: 0,
      ceil: 150,
      onChange: sliderChanged,
      onStart: sliderStart,
      onEnd: sliderEnd
    };
  };

  vm.$onChanges = function (changes) {
    if (changes.config) {
      vm.config = _.pick(vm.config, ['contrast', 'brightness', 'saturation']);
      _.defaults(vm.config, {contrast: 100, brightness: 100, saturation: 100});
    }
  };

  function sliderChanged() {
    vm.onChange({config: vm.config});
  }

  function sliderStart() {
    modalConfig.disableBackdropClose(true);
  }

  function sliderEnd() {
    modalConfig.disableBackdropClose(false);
  }
}

module.exports = component;
