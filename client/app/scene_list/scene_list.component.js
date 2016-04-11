var templateUrl = require('./scene_list.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneListController,
  bindings: {
    sceneContents: '<',
    selectedSceneContent: '<',
    onSelect: '&',
    onSort: '&'
  }
};

function SceneListController() {
  var vm = this;

  vm.$onInit = function () {
    vm.sceneListConfig = {
      onSort: function (evt) {
        vm.onSort({sceneContent: evt.model, position: evt.newIndex + 1});
      }
    }
  };

  vm.isSelected = isSelected;

  function isSelected(sceneContent) {
    return vm.selectedSceneContent === sceneContent;
  }
}

module.exports = component;
