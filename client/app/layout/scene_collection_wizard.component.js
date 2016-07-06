var templateUrl = require('./scene_collection_wizard.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneCollectionWizardController,
  bindings: {
    sceneCollection: '<'
  }
};

/*@ngInject*/
function SceneCollectionWizardController(sceneCollectionService) {
  var vm = this;

  vm.updateSceneCollection = updateSceneCollection;
  vm.reloadSceneCollection = reloadSceneCollection;

  function updateSceneCollection($event) {
    return sceneCollectionService.update({id: vm.sceneCollection.id}, $event.sceneCollection).then(function onSuccess(data) {
      vm.sceneCollection = data;
    });
  }

  function reloadSceneCollection() {
    return sceneCollectionService.get({id: vm.sceneCollection.id}, function (data) {
      vm.sceneCollection = data;
    });
  }
}

module.exports = component;
