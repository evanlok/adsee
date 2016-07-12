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

/*@ngInject*/
function ContentEditorController() {
  var vm = this;
  vm.updateSceneAttribute = updateSceneAttribute;

  function updateSceneAttribute(sceneAttribute, attributes) {
    vm.onUpdateSceneAttribute({sceneAttribute: sceneAttribute, attributes: attributes});
  }
}

module.exports = component;
