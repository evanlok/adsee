var templateUrl = require('./scene_editor.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneEditorController,
  bindings: {
    sceneCollection: '<',
    sceneContents: '<',
    selectedSceneContent: '<'
  },
  require: {
    sceneCollectionEditor: '^^'
  }
};

/*@ngInject*/
function SceneEditorController($state, transitionsService, videoJobService, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    vm.transitions = transitionsService.get();
    vm.activeTab = 0;
    vm.previewLoading = false;
  };

  vm.sceneContentPosition = sceneContentPosition;
  vm.duration = duration;
  vm.preview = preview;

  function sceneContentPosition(sceneContent) {
    return _.indexOf(vm.sceneContents, sceneContent) + 1;
  }

  function duration() {
    return _.sumBy(vm.sceneContents, function (sceneContent) {
      return sceneContent.scene.duration || 0;
    });
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
