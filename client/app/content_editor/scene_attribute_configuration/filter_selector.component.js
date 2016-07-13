var templateUrl = require('./filter_selector.html');

var component = {
  templateUrl: templateUrl,
  controller: FilterSelectorController,
  bindings: {
    selectedFilter: '@',
    onSelect: '&',
    onRemove: '&'
  }
};

/*@ngInject*/
function FilterSelectorController(filterService) {
  var vm = this;

  vm.$onInit = function () {
    fetchFilters();
  };

  vm.selectFilter = selectFilter;

  function fetchFilters() {
    filterService.query().then(function (data) {
      vm.groupedFilters = _.chunk(data, 3);
    });
  }

  function selectFilter(filter) {
    vm.onSelect({filter: filter});
  }
}

module.exports = component;
