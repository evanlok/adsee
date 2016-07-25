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
function ColorSettingsController() {
  var vm = this;

  vm.$onChanges = function (changes) {
    if (changes.config) {
      vm.config = _.pick(vm.config, ['contrast', 'brightness', 'saturation']);
      _.defaults(vm.config, {contrast: 100, brightness: 100, saturation: 100});
    }
  };

  vm.sliderChanged = sliderChanged;

  function sliderChanged() {
    vm.onChange({config: vm.config});
  }
}

module.exports = component;
