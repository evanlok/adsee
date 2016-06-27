var templateUrl = require('./preview.html');

var component = {
  templateUrl: templateUrl,
  controller: PreviewController,
  bindings: {
    videoJobId: '@'
  }
};

/*@ngInject*/
function PreviewController($timeout, $state, videoJobService, facebookAdService, sceneCollectionService) {
  var vm = this;
  var timeoutPromise;

  vm.$onInit = function () {
    vm.videoJob = {};
    vm.sceneCollection = {};
    vm.saving = false;

    fetchSceneCollection();
    fetchVideoJob();
  };

  vm.$onDestroy = function () {
    $timeout.cancel(timeoutPromise);
  };

  vm.nextStep = nextStep;
  vm.configureAd = configureAd;

  function fetchSceneCollection() {
    return sceneCollectionService.get({id: $state.params.sceneCollectionId}).then(function (data) {
      vm.sceneCollection = data;
      return data;
    });
  }

  function fetchVideoJob() {
    videoJobService.get({id: vm.videoJobId}).then(function onSuccess(data) {
      vm.videoJob = data;

      if (!vm.videoJob.stream_url) {
        timeoutPromise = $timeout(fetchVideoJob, 1500);
      }
    });
  }

  function nextStep() {
    fetchSceneCollection().then(function (sceneCollection) {
      if (sceneCollection.integration === 'facebook_ad') {
        configureAd();
      } else {
        $state.go('facebookPostConfig');
      }
    });
  }

  function configureAd() {
    vm.saving = true;

    facebookAdService.save({sceneCollectionId: vm.videoJob.scene_collection_id}).then(function (data) {
      $state.go('adConfig', {facebookAdId: data.id});
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
