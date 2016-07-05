var templateUrl = require('./scene_collection_editor.html');
var removeSceneConfirmationModalCtrl = require('./remove_scene_confirmation_modal.controller');
var removeSceneConfirmationModalTemplateUrl = require('./remove_scene_confirmation_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneCollectionEditorController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function SceneCollectionEditorController($uibModal, sceneCollectionService, sceneContentService, sceneAttributeService) {
  var vm = this;

  vm.$onInit = function () {
    vm.sceneCollection = {};
    vm.sceneContents = [];
    vm.selectedSceneContent = {};

    fetchSceneCollection();
    fetchSceneContents();
  };

  vm.updateSceneCollection = updateSceneCollection;
  vm.updateSceneContentTransition = updateSceneContentTransition;
  vm.updateSceneAttribute = updateSceneAttribute;
  vm.selectSceneContent = selectSceneContent;
  vm.addScene = addScene;
  vm.removeScene = removeScene;
  vm.previousSceneContent = previousSceneContent;
  vm.nextSceneContent = nextSceneContent;
  vm.sceneContentPosition = sceneContentPosition;
  vm.updateSceneContentPosition = updateSceneContentPosition;
  vm.lastScene = lastScene;

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

    return sceneCollectionService.update({id: vm.sceneCollection.id}, vm.sceneCollection).then(function onSuccess(data) {
      vm.sceneCollection = data;
    });
  }

  function updateSceneContentTransition() {
    sceneContentService.update({id: vm.selectedSceneContent.id}, vm.selectedSceneContent).then(function (data) {
      _.merge(vm.selectedSceneContent, data);
    });
  }

  function updateSceneAttribute(sceneAttribute, value) {
    sceneAttribute = _.find(vm.selectedSceneContent.scene_attributes, {name: sceneAttribute.name});
    sceneAttribute.value = value || null;
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
      _.merge(sceneAttribute, data);
      sceneAttribute.invalid = false;
    }, function onError() {
      sceneAttribute.invalid = true;
    });
  }

  function selectSceneContent(sceneContent) {
    vm.selectedSceneContent = sceneContent;
    vm.activeTab = 0;
  }

  function addScene(scene) {
    sceneContentService.save({sceneCollectionId: vm.sceneCollection.id}, {scene_id: scene.id}).then(function (data) {
      vm.sceneContents.push(data);
      selectSceneContent(_.last(vm.sceneContents));
      vm.displayAddScene = false;
    });
  }

  function removeScene(sceneContent) {
    var modal = $uibModal.open({
      controller: removeSceneConfirmationModalCtrl,
      templateUrl: removeSceneConfirmationModalTemplateUrl,
      windowClass: 'remove-scene-confirmation',
      resolve: {
        sceneContent: function () {
          return sceneContent;
        }
      }
    });

    modal.result.then(function () {
      sceneContentService.delete({id: sceneContent.id}).then(function () {
        if (sceneContent === vm.selectedSceneContent) {
          var index = _.indexOf(vm.sceneContents, sceneContent);

          if (index == 0) {
            index = 0;
          } else {
            index -= 1;
          }

          selectSceneContent(vm.sceneContents[index]);
        }

        _.pull(vm.sceneContents, sceneContent);
      });
    });
  }

  function previousSceneContent() {
    var index = _.indexOf(vm.sceneContents, vm.selectedSceneContent) - 1;
    selectSceneContent(vm.sceneContents[index]);
  }

  function nextSceneContent() {
    var index = _.indexOf(vm.sceneContents, vm.selectedSceneContent) + 1;
    selectSceneContent(vm.sceneContents[index]);
  }

  function sceneContentPosition(sceneContent) {
    return _.indexOf(vm.sceneContents, sceneContent) + 1;
  }

  function updateSceneContentPosition(sceneContent, position) {
    sceneContentService.update({id: sceneContent.id}, {position: position});
  }

  function lastScene() {
    return _.indexOf(vm.sceneContents, vm.selectedSceneContent) === (vm.sceneContents.length - 1);
  }
}

module.exports = component;
