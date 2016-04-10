var templateUrl = require('./scene_editor.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneEditorController
};

function SceneEditorController($routeParams, sceneCollectionService, sceneContentService, sceneAttributeService) {
  var vm = this;

  vm.$onInit = function () {
    fetchSceneCollection();
    fetchSceneContents();
  };

  vm.sceneCollectionId = $routeParams.sceneCollectionId;
  vm.sceneCollection = {};
  vm.sceneContents = [];
  vm.selectedSceneContent = {};
  vm.updateSceneCollection = updateSceneCollection;
  vm.updateSceneAttribute = updateSceneAttribute;
  vm.selectSceneContent = selectSceneContent;
  vm.addScene = addScene;

  function fetchSceneCollection() {
    sceneCollectionService.get({id: vm.sceneCollectionId}).then(function (data) {
      vm.sceneCollection = data;
    });
  }

  function fetchSceneContents() {
    sceneContentService.query({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      vm.sceneContents = data;
      vm.selectedSceneContent = data[0];
    });
  }

  function updateSceneCollection(prop, value) {
    vm.sceneCollection[prop] = value;

    sceneCollectionService.update({id: vm.sceneCollection.id}, vm.sceneCollection).then(function onSuccess(data) {
      vm.sceneCollection = data;
    });
  }

  function updateSceneAttribute(sceneAttribute, value) {
    sceneAttribute.value = value;
    var promise;

    if (sceneAttribute.id) {
      promise = sceneAttributeService.update({id: sceneAttribute.id}, {value: sceneAttribute.value});
    } else {
      promise = sceneAttributeService.save({sceneContentId: vm.selectedSceneContent.id}, {
        name: sceneAttribute.name,
        type: sceneAttribute.type,
        value: sceneAttribute.value
      });
    }

    promise.then(function onSuccess(data) {
      sceneAttribute.id = data.id;
      sceneAttribute.invalid = false;
    }, function onError() {
      sceneAttribute.invalid = true;
    });
  }

  function selectSceneContent(sceneContent) {
    vm.selectedSceneContent = sceneContent;
  }
  
  function addScene() {
    console.log('add scene')
  }
}

module.exports = component;
