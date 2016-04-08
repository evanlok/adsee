var templateUrl = require('./scene_editor.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneEditorController
};

function SceneEditorController($routeParams, sceneCollectionService) {
  var vm = this;

  vm.sceneCollectionId = $routeParams.sceneCollectionId;
  vm.sceneCollection = {};

  sceneCollectionService.get({id: vm.sceneCollectionId}).then(function (data) {
    vm.sceneCollection = data;
  });
}

module.exports = component;
