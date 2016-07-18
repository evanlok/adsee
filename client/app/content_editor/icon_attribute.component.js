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
    vm.value = vm.sceneAttribute.attachment_id;
    vm.name = vm.sceneAttribute.icon_name;
    mediaSelectorService.onMediaSelected(vm.sceneAttribute.name, onMediaSelected);
  };

  vm.$onDestroy = function () {
    mediaSelectorService.removeMediaSelectCallback(vm.sceneAttribute.name);
  };

  vm.insertMedia = insertMedia;

  function insertMedia() {
    mediaSelectorService.insertMedia(vm.sceneAttribute.name, vm.sceneAttribute.type);
  }

  function onMediaSelected(icon) {
    vm.value = icon.id;
    vm.name = icon.name;
    vm.sceneAttributeCtrl.onUpdate({sceneAttribute: vm.sceneAttribute, attributes: {value: vm.value}});
  }
}

module.exports = component;
