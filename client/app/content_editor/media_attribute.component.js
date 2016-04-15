var templateUrl = require('./media_attribute.html');

var component = {
  templateUrl: templateUrl,
  controller: MediaAttributeController,
  bindings: {
    sceneAttribute: '<'
  },
  require: {
    sceneAttributeCtrl: '^sceneAttribute'
  }
};

/*@ngInject*/ function MediaAttributeController(mediaSelectorService) {
  var vm = this;

  vm.$onInit = function () {
    vm.value = vm.sceneAttribute.attachment_id;
    vm.filename = vm.sceneAttribute.filename;
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
    vm.value = media.id;
    vm.filename = media.filename;
    vm.sceneAttributeCtrl.onUpdate({sceneAttribute: vm.sceneAttribute, value: vm.value});
  }
}

module.exports = component;
