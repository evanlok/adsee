var templateUrl = require('./scene_editor.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneEditorController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function SceneEditorController($state, sceneCollectionService, sceneContentService, sceneAttributeService,
                               transitionsService, mediaSelectorService, videoJobService, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    vm.sceneCollection = {};
    vm.sceneContents = [];
    vm.selectedSceneContent = {};
    vm.transitions = transitionsService.get();
    vm.displayAddScene = false;
    vm.activeTab = 0;
    vm.previewLoading = false;

    mediaSelectorService.onMediaInsert(function () {
      vm.activeTab = 1;
    });

    mediaSelectorService.onMediaSelected(function () {
      vm.activeTab = 0;
    });

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
  vm.preview = preview;

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
      _.merge(sceneAttribute, data);
      sceneAttribute.invalid = false;
    }, function onError() {
      sceneAttribute.invalid = true;
    });
  }

  function selectSceneContent(sceneContent) {
    vm.selectedSceneContent = sceneContent;
    vm.activeTab = 0;
    mediaSelectorService.reset();
  }

  function addScene(scene) {
    sceneContentService.save({sceneCollectionId: vm.sceneCollection.id}, {scene_id: scene.id}).then(function (data) {
      vm.sceneContents.push(data);
      selectSceneContent(_.last(vm.sceneContents));
      vm.displayAddScene = false;
    });
  }

  function removeScene(sceneContent) {
    sceneContentService.delete({id: sceneContent.id}).then(function (data) {
      var index = _.indexOf(vm.sceneContents, sceneContent);

      if (index == 0) {
        index = 0;
      } else {
        index -= 1;
      }

      _.pull(vm.sceneContents, sceneContent);
      selectSceneContent(vm.sceneContents[index]);
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

  function preview() {
    vm.previewLoading = true;

    videoJobService.preview({sceneCollectionId: vm.sceneCollection.id}).then(function (videoJob) {
      $state.go('preview', {videoJobId: videoJob.id});
    }, function onError() {
      // Skip preview if there is an error
      facebookAdService.save({sceneCollectionId: vm.sceneCollection.id}).then(function (data) {
        $state.go('adConfig', {facebookAdId: data.id});
      });
    }).finally(function () {
      vm.previewLoading = false;
    });
  }
}

module.exports = component;
