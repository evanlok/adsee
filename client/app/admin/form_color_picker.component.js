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
}

module.exports = component;
