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
function IconAttributeController($state) {
  var vm = this;

  vm.insertMedia = insertMedia;

  function insertMedia() {
    $state.go('mediaLibrary', {sceneAttribute: vm.sceneAttribute});
  }
}

module.exports = component;
