var templateUrl = require('./scene_editor.html');
var aspectRatioModalCtrl = require('./aspect_ratio_modal.controller');
var aspectRatioModalTemplateUrl = require('./aspect_ratio_modal.html');
var removeSceneConfirmationModalCtrl = require('./remove_scene_confirmation_modal.controller');
var removeSceneConfirmationModalTemplateUrl = require('./remove_scene_confirmation_modal.html');
var toastr = require('toastr');

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
    vm.selectedSceneContentIdx = 0;
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

  vm.selectedSceneContent = selectedSceneContent;
  vm.updateSceneCollection = updateSceneCollection;
  vm.updateSceneContent = updateSceneContent;
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

      if (!vm.sceneContents.length) {
        vm.displayAddScene = true;
      }
    });
  }

  function selectedSceneContent() {
    return vm.sceneContents[vm.selectedSceneContentIdx];
  }

  function updateSceneCollection(prop, value) {
    vm.sceneCollection[prop] = value;

    return sceneCollectionService.update({id: vm.sceneCollection.id}, vm.sceneCollection).then(function onSuccess(data) {
      vm.sceneCollection = data;
    });
  }

  function updateSceneContent($event) {
    var sceneContent = $event.sceneContent;

    sceneContentService.update({id: sceneContent.id}, sceneContent).then(function (data) {
      var index = _.indexOf(vm.sceneContents, sceneContent);
      vm.sceneContents[index] = data;
    });
  }

  function updateSceneAttribute(sceneAttribute, attributes) {
    var promise;

    if (sceneAttribute.id) {
      promise = sceneAttributeService.update({id: sceneAttribute.id}, attributes);
    } else {
      var params = {
        name: sceneAttribute.name,
        type: sceneAttribute.type
      };

      _.assign(params, attributes);
      promise = sceneAttributeService.save({sceneContentId: vm.selectedSceneContent().id}, params);
    }

    promise.then(function onSuccess(data) {
      var sceneContent = _.find(vm.sceneContents, {id: data.scene_content_id});
      var sceneAttribute = _.find(sceneContent.scene_attributes, {id: data.id});

      if (sceneAttribute) {
        _.assign(sceneAttribute, data);
      } else {
        sceneContent.scene_attributes.push(sceneAttribute);
      }
      
      sceneAttribute.invalid = false;
    }, function onError() {
      sceneAttribute.invalid = true;
    });
  }

  function selectSceneContent(sceneContent) {
    vm.selectedSceneContentIdx = _.indexOf(vm.sceneContents, sceneContent);
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
        if (sceneContent === vm.selectedSceneContent()) {
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
    selectSceneContent(vm.sceneContents[vm.selectedSceneContentIdx - 1]);
  }

  function nextSceneContent() {
    selectSceneContent(vm.sceneContents[vm.selectedSceneContentIdx + 1]);
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

  function lastScene(sceneContent) {
    if (sceneContent) {
      return _.indexOf(vm.sceneContents, sceneContent) === vm.sceneContents.length - 1;
    } else {
      return vm.selectedSceneContentIdx === (vm.sceneContents.length - 1);
    }
  }

  function preview() {
    vm.previewLoading = true;

    videoJobService.preview({sceneCollectionId: vm.sceneCollection.id}).then(function (videoJob) {
      $state.go('preview', {videoJobId: videoJob.id});
    }, function onError() {
      // Skip preview if there is an error
      facebookAdService.save({sceneCollectionId: vm.sceneCollection.id}).then(function (data) {
        $state.go('adConfig', {facebookAdId: data.id});
        toastr.error('', 'There was an error generating the video preview.');
      });
    }).finally(function () {
      vm.previewLoading = false;
    });
  }
}

module.exports = component;
