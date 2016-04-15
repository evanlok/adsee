var templateUrl = require('./scene_attribute.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneAttributeController,
  bindings: {
    sceneAttribute: '<',
    onUpdate: '&'
  }
};

/*@ngInject*/ function SceneAttributeController() {
  var vm = this;
  vm.value = vm.sceneAttribute.value;
  vm.update = update;
  vm.textInput = textInput;
  vm.mediaInput = mediaInput;

  function update() {
    vm.onUpdate({sceneAttribute: vm.sceneAttribute, value: vm.value});
  }
  
  function textInput() {
    return _.includes(['text', 'url', 'number'], vm.sceneAttribute.type);
  }

  function mediaInput() {
    return _.includes(['image', 'video'], vm.sceneAttribute.type);
  }
}

module.exports = component;
