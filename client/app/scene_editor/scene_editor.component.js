var templateUrl = require('./scene_editor.html');
//require('./scene_editor.scss');

var component = {
  templateUrl: templateUrl,
  controller: SceneEditorController
};

function SceneEditorController($routeParams) {
  var vm = this;

  vm.sceneCollectionId = $routeParams.sceneCollectionId;
}

module.exports = component;
