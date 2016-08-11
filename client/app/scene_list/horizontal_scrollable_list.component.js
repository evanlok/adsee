var templateUrl = require('./horizontal_scrollable_list.html');

var component = {
  templateUrl: templateUrl,
  controller: HorizontalScrollableListController,
  bindings: {
    items: '<',
    spacing: '@'
  },
  transclude: true
};

/*@ngInject*/
function HorizontalScrollableListController($window, $element, $timeout) {
  var vm = this;
  var listItems, start, itemsToDisplay;

  vm.$onInit = function () {
    start = 0;
  };

  vm.$onChanges = function (changes) {
    if (changes.items) {
      var newLength = changes.items.currentValue.length;
      var oldLength = changes.items.isFirstChange() ? 0 : changes.items.previousValue.length;

      if (newLength !== oldLength) {
        $timeout(function () {
          listItems = $element.find('li');
          var added = false;

          if (newLength < oldLength && start + itemsToDisplay > listItems.length) {
            start -= 1;
          } else if (newLength > oldLength) {
            added = true;
          }

          initializeItemDisplay(added);
        });
      }
    }
  };

  vm.$postLink = function () {
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
      start = listItems.length - itemsToDisplay;
    }

    if (start < 0) {
      start = 0;
    }

    toggleDisplay();
  }

  function next() {
    if (start + itemsToDisplay < listItems.length) {
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
    return listItems && start + itemsToDisplay < listItems.length;
  }

  function toggleDisplay() {
    listItems.slice(0, start).addClass('hidden');
    listItems.slice(start, start + itemsToDisplay).removeClass('hidden');
    listItems.slice(start + itemsToDisplay).addClass('hidden');
  }
}

module.exports = component;
