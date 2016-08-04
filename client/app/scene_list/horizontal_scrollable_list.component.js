var templateUrl = require('./horizontal_scrollable_list.html');

var component = {
  templateUrl: templateUrl,
  controller: HorizontalScrollableListController,
  bindings: {
    spacing: '@'
  },
  transclude: true
};

/*@ngInject*/
function HorizontalScrollableListController($window, $element, $scope) {
  var vm = this;
  var items, start, itemsToDisplay;

  vm.$onInit = function () {
    start = 0;
  };

  vm.$postLink = function () {
    $scope.$watch(function () {
      return $element.find('ul')[0].childElementCount;
    }, function(newVal, oldVal) {
      items = $element.find('li');
      var added = false;

      if (newVal < oldVal && start + itemsToDisplay > items.length) {
        start -= 1;
      } else if (newVal > oldVal) {
        added = true;
      }

      initializeItemDisplay(added);
    });

    angular.element($window).on('resize', initializeItemDisplay);
  };

  vm.$onDestroy = function () {
    angular.element($window).off('resize', initializeItemDisplay);
  };

  vm.next = next;
  vm.previous = previous;
  vm.hasNext = hasNext;
  vm.hasPrevious = hasPrevious;

  function initializeItemDisplay(addedItem) {
    var listWidth = $element.find('ul').width();
    var itemWidth = $element.find('li').first().outerWidth();

    if (vm.spacing) {
      itemWidth += parseFloat(vm.spacing);
    }

    itemsToDisplay = Math.floor(listWidth / itemWidth);

    if (addedItem) {
      start = items.length - itemsToDisplay;
    }

    if (start < 0) {
      start = 0;
    }

    toggleDisplay();
  }

  function next() {
    if (start + itemsToDisplay < items.length) {
      start += 1;
      toggleDisplay();
    }
  }

  function previous() {
    if (start !== 0) {
      start -= 1;
      toggleDisplay();
    }
  }

  function hasPrevious() {
    return start > 0;
  }

  function hasNext() {
    return items && start + itemsToDisplay < items.length;
  }

  function toggleDisplay() {
    items.slice(0, start).addClass('hidden');
    items.slice(start, start + itemsToDisplay).removeClass('hidden');
    items.slice(start + itemsToDisplay).addClass('hidden');
  }
}

module.exports = component;
