var templateUrl = require('./content_editor.html');

var component = {
  templateUrl: templateUrl,
  controller: ContentEditorController,
  bindings: {
    sceneContent: '<',
    onUpdateSceneAttribute: '&'
  },
  require: {
    sceneEditor: '^^'
  }
};

/*@ngInject*/ function ContentEditorController() {
  var vm = this;
  vm.updateSceneAttribute = updateSceneAttribute;

  function updateSceneAttribute(sceneAttribute, value) {
    vm.onUpdateSceneAttribute({sceneAttribute: sceneAttribute, value: value});
  }
}

module.exports = component;
