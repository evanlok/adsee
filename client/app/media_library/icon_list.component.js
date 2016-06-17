var templateUrl = require('./icon_list.html');

var component = {
  templateUrl: templateUrl,
  controller: IconListController,
  bindings: {
    icons: '<',
    onSelect: '&'
  }
};

/*@ngInject*/
function IconListController() {
  var vm = this;

  vm.$onInit = function () {
  };
}

module.exports = component;
