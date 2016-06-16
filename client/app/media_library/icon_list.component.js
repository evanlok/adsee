var templateUrl = require('./icon_list.html');

var component = {
  templateUrl: templateUrl,
  controller: IconListController,
  bindings: {
    selecting: '<',
    onSelect: '&',
    searchQuery: '@'
  }
};

/*@ngInject*/
function IconListController(iconService) {
  var vm = this;

  vm.$onInit = function () {
    vm.icons = [];
  };

  vm.$onChanges = function (changes) {
    if (changes.searchQuery) {
      fetchIcons();
    }
  };

  function fetchIcons() {
    iconService.query({q: vm.searchQuery}).then(function (data) {
      vm.icons = data;
    });
  }
}

module.exports = component;
