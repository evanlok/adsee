var templateUrl = require('./icon_attribute.html');

var component = {
  templateUrl: templateUrl,
  controller: IconAttributeController,
  bindings: {
    sceneAttribute: '<'
  },
  require: {
    sceneAttributeCtrl: '^sceneAttribute'
  }
};

/*@ngInject*/
function IconAttributeController(mediaSelectorService) {
  var vm = this;

  vm.$onInit = function () {
    vm.value = vm.sceneAttribute.value;
    mediaSelectorService.onMediaSelected(vm.sceneAttribute.name, onMediaSelected);
  };

  vm.$onDestroy = function () {
    mediaSelectorService.removeMediaSelectCallback(vm.sceneAttribute.name);
  };

  vm.insertMedia = insertMedia;

  function insertMedia() {
    mediaSelectorService.insertMedia(vm.sceneAttribute.name, vm.sceneAttribute.type);
  }

  function onMediaSelected(media) {
    vm.value = media.name;
    vm.sceneAttributeCtrl.onUpdate({sceneAttribute: vm.sceneAttribute, value: vm.value});
  }
}

module.exports = component;
