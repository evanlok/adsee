var templateUrl = require('./image_list.html');

var component = {
  templateUrl: templateUrl,
  controller: ImageListController,
  bindings: {
    images: '<',
    allowDelete: '@',
    onSelect: '&',
    onDelete: '&'
  }
};

/*@ngInject*/
function ImageListController() {
  var vm = this;

  vm.$onInit = function () {
    vm.groupedImages = _.chunk(vm.images, 3);
    vm.showDelete = vm.allowDelete === '';
  };

  vm.$onChanges = function () {
    vm.groupedImages = _.chunk(vm.images, 3);
  };
}

module.exports = component;
