var templateUrl = require('./scene_editor.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneEditorController
};

function SceneEditorController($stateParams, sceneCollectionService, sceneContentService, sceneAttributeService, transitionsService) {
  var vm = this;

  vm.$onInit = function () {
    vm.sceneCollectionId = $stateParams.sceneCollectionId;
    vm.sceneCollection = {};
    vm.sceneContents = [];
    vm.selectedSceneContent = {};
    vm.transitions = transitionsService.get();
    vm.displayAddScene = false;

    fetchSceneCollection();
    fetchSceneContents();
  };

  vm.updateSceneCollection = updateSceneCollection;
  vm.updateSceneContentTransition = updateSceneContentTransition;
  vm.updateSceneAttribute = updateSceneAttribute;
  vm.selectSceneContent = selectSceneContent;
  vm.addScene = addScene;
  vm.previousSceneContent = previousSceneContent;
  vm.nextSceneContent = nextSceneContent;

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

  function updateSceneContentTransition() {
    sceneContentService.update({id: vm.selectedSceneContent.id}, vm.selectedSceneContent).then(function (data) {
      _.merge(vm.selectedSceneContent, data);
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

  function previousSceneContent() {
    var index = _.indexOf(vm.sceneContents, vm.selectedSceneContent) - 1;
    selectSceneContent(vm.sceneContents[index]);
  }

  function nextSceneContent() {
    var index = _.indexOf(vm.sceneContents, vm.selectedSceneContent) + 1;
    selectSceneContent(vm.sceneContents[index]);
  }
}

module.exports = component;
