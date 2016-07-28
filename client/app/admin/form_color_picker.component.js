var templateUrl = require('./form_color_picker.html');

var component = {
  templateUrl: templateUrl,
  controller: FormColorPickerController,
  bindings: {
    name: '@',
    color: '@'
  }
};

/*@ngInject*/
function FormColorPickerController() {
  var vm = this;

  vm.$onInit = function () {
    vm.colorPickerOptions = {format: 'hex'};
  };
}

module.exports = component;
