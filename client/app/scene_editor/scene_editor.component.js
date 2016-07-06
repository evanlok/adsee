var templateUrl = require('./scene_editor.html');
var aspectRatioModalCtrl = require('./aspect_ratio_modal.controller');
var aspectRatioModalTemplateUrl = require('./aspect_ratio_modal.html');
var removeSceneConfirmationModalCtrl = require('./remove_scene_confirmation_modal.controller');
var removeSceneConfirmationModalTemplateUrl = require('./remove_scene_confirmation_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneEditorController,
  bindings: {
    sceneCollection: '<'
  }
};

/*@ngInject*/
function SceneEditorController($state, $uibModal, sceneCollectionService, sceneContentService, sceneAttributeService,
                               transitionsService, mediaSelectorService, videoJobService, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    vm.sceneContents = [];
    vm.selectedSceneContent = {};
    vm.transitions = transitionsService.get();
    vm.displayAddScene = false;
    vm.displayMediaLibrary = false;
    vm.activeTab = 0;
    vm.previewLoading = false;

    mediaSelectorService.onMediaInsert(function () {
      vm.displayMediaLibrary = true;
    });

    mediaSelectorService.onMediaSelected(function () {
      vm.displayMediaLibrary = false;
    });
  };

  vm.$onChanges = function (changes) {
    if (changes.sceneCollection) {
      fetchSceneContents();
    }
  };

  vm.updateSceneCollection = updateSceneCollection;
  vm.updateSceneContentTransition = updateSceneContentTransition;
  vm.updateSceneAttribute = updateSceneAttribute;
  vm.selectSceneContent = selectSceneContent;
  vm.showAddScenePage = showAddScenePage;
  vm.addScene = addScene;
  vm.removeScene = removeScene;
  vm.previousSceneContent = previousSceneContent;
  vm.nextSceneContent = nextSceneContent;
  vm.sceneContentPosition = sceneContentPosition;
  vm.updateSceneContentPosition = updateSceneContentPosition;
  vm.duration = duration;
  vm.lastScene = lastScene;
  vm.preview = preview;

  function fetchSceneContents() {
    sceneContentService.query({sceneCollectionId: vm.sceneCollection.id}).then(function (data) {
      vm.sceneContents = data;
      vm.selectedSceneContent = data[0];

      if (!vm.sceneContents.length) {
        vm.displayAddScene = true;
      }
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
    mediaSelectorService.reset();
  }

  function showAddScenePage() {
    if (_.isEmpty(vm.sceneContents) && !vm.sceneCollection.aspect_ratio) {
      var modal = $uibModal.open({
        controller: aspectRatioModalCtrl,
        templateUrl: aspectRatioModalTemplateUrl,
        resolve: {
          aspectRatio: function () {
            return vm.sceneCollection.aspect_ratio;
          }
        }
      });

      modal.result.then(function (aspectRatio) {
        updateSceneCollection('aspect_ratio', aspectRatio).then(function () {
          vm.displayAddScene = true;
        });
      });
    } else {
      vm.displayAddScene = true;
    }
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

  function duration() {
    return _.sumBy(vm.sceneContents, function (sceneContent) {
      return sceneContent.scene.duration || 0;
    });
  }

  function lastScene() {
    return _.indexOf(vm.sceneContents, vm.selectedSceneContent) === (vm.sceneContents.length - 1);
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
