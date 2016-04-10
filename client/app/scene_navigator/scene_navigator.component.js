var templateUrl = require('./scene_navigator.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneNavigatorController,
  bindings: {
    sceneContents: '<',
    selectedSceneContent: '<',
    onNext: '&',
    onPrevious: '&'
  }
};

function SceneNavigatorController() {
  var vm = this;
  
  vm.firstScene = firstScene;
  vm.lastScene = lastScene;

  function firstScene() {
    return _.indexOf(vm.sceneContents, vm.selectedSceneContent) === 0;
  }

  function lastScene() {
    return _.indexOf(vm.sceneContents, vm.selectedSceneContent) === (vm.sceneContents.length - 1);
  }
}

module.exports = component;
