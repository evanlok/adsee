var templateUrl = require('./scene_list.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneListController,
  bindings: {
    sceneContents: '<',
    selectedSceneContent: '<',
    onSelect: '&'
  }
};

function SceneListController() {
  var vm = this;
  vm.isSelected = isSelected;

  function isSelected(sceneContent) {
    return vm.selectedSceneContent === sceneContent;
  }
}

module.exports = component;
