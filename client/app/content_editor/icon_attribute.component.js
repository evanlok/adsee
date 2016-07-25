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
    mediaSelectorService.onMediaSelected(vm.sceneAttribute.name, onMediaSelected);
  };

  vm.$onDestroy = function () {
    mediaSelectorService.removeMediaSelectCallback(vm.sceneAttribute.name);
  };

  vm.insertMedia = insertMedia;

  function insertMedia() {
    mediaSelectorService.insertMedia(vm.sceneAttribute.name, vm.sceneAttribute.type);
  }

  function onMediaSelected(attachment) {
    var attributes;

    if (attachment.type === 'icon') {
      attributes = {value: attachment.id};
    } else if (attachment.type === 'image') {
      attributes = {image_id: attachment.id};
    }

    vm.sceneAttributeCtrl.onUpdate({sceneAttribute: vm.sceneAttribute, attributes: attributes});
  }
}

module.exports = component;
