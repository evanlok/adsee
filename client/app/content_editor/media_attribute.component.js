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

/*@ngInject*/
function MediaAttributeController($state) {
  var vm = this;

  vm.insertMedia = insertMedia;
  vm.isVideo = isVideo;

  function insertMedia() {
    $state.go('mediaLibrary', {sceneAttribute: vm.sceneAttribute});
  }

  function isVideo() {
    return vm.sceneAttribute.type === 'video';
  }
}

module.exports = component;
