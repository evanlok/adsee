var templateUrl = require('./add_scene.html');

var component = {
  templateUrl: templateUrl,
  controller: AddSceneController,
  bindings: {
    sceneContents: '<',
    selectedSceneContent: '<',
    onSelect: '&',
    onAddScene: '&'
  }
};

function AddSceneController() {
  var vm = this;

}

module.exports = component;
