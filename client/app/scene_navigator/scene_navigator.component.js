var templateUrl = require('./scene_navigator.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneNavigatorController,
  bindings: {
    sceneContents: '<',
    selectedSceneContentIdx: '@',
    onNext: '&',
    onPrevious: '&'
  }
};

/*@ngInject*/ function SceneNavigatorController() {
  var vm = this;
  
  vm.firstScene = firstScene;
  vm.lastScene = lastScene;

  function firstScene() {
    return parseInt(vm.selectedSceneContentIdx) === 0;
  }

  function lastScene() {
    return parseInt(vm.selectedSceneContentIdx) === (vm.sceneContents.length - 1);
  }
}

module.exports = component;
