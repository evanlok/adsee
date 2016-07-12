var templateUrl = require('./scene_attribute.html');
var textModalCtrl = require('./scene_attribute_configuration/text_modal.controller');
var textModalTemplateUrl = require('./scene_attribute_configuration/text_modal.html');
var videoModalCtrl = require('./scene_attribute_configuration/video_modal.controller');
var videoModalTemplateUrl = require('./scene_attribute_configuration/video_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneAttributeController,
  bindings: {
    sceneAttribute: '<',
    onUpdate: '&'
  }
};

/*@ngInject*/
function SceneAttributeController($uibModal) {
  var vm = this;
  vm.value = vm.sceneAttribute.value;
  vm.update = update;
  vm.textInput = textInput;
  vm.mediaInput = mediaInput;
  vm.configureAttribute = configureAttribute;

  function update() {
    vm.onUpdate({sceneAttribute: vm.sceneAttribute, attributes: {value: vm.value || null}});
  }

  function textInput() {
    return _.includes(['text', 'url', 'number'], vm.sceneAttribute.type);
  }

  function mediaInput() {
    return _.includes(['image', 'video'], vm.sceneAttribute.type);
  }

  function configureAttribute() {
    var ctrl, templateUrl;

    switch (vm.sceneAttribute.type) {
      case 'text':
        ctrl = textModalCtrl;
        templateUrl = textModalTemplateUrl;
        break;
      case 'video':
        ctrl = videoModalCtrl;
        templateUrl = videoModalTemplateUrl;
        break;
    }

    openConfigModal(ctrl, templateUrl);
  }

  function openConfigModal(ctrl, templateUrl) {
    var modal = $uibModal.open({
      controller: ctrl,
      templateUrl: templateUrl,
      resolve: {
        sceneAttribute: function () {
          return vm.sceneAttribute;
        }
      }
    });

    modal.result.then(function (config) {
      vm.onUpdate({sceneAttribute: vm.sceneAttribute, attributes: {config: config}});
    });
  }
}

module.exports = component;
