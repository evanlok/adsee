var templateUrl = require('./preview.html');

var component = {
  templateUrl: templateUrl,
  controller: PreviewController,
  bindings: {
    videoJobId: '@'
  }
};

/*@ngInject*/
function PreviewController($interval, $state, videoJobService, facebookAdService, sceneCollectionService) {
  var vm = this;
  var intervalPromise;

  vm.$onInit = function () {
    vm.videoJob = {};
    vm.sceneCollection = {};
    vm.saving = false;

    fetchSceneCollection();
    pollStreamurl();
  };

  vm.$onDestroy = function () {
    $interval.cancel(intervalPromise);
  };

  vm.nextStep = nextStep;
  vm.configureAd = configureAd;

  function fetchSceneCollection() {
    return sceneCollectionService.get({id: $state.params.sceneCollectionId}).then(function (data) {
      vm.sceneCollection = data;
      return data;
    });
  }

  function pollStreamurl() {
    intervalPromise = $interval(fetchVideoJob, 1500);
  }

  function fetchVideoJob() {
    videoJobService.get({id: vm.videoJobId}).then(function (data) {
      vm.videoJob = data;

      if (vm.videoJob.stream_url) {
        $interval.cancel(intervalPromise);
      }
    });
  }

  function nextStep() {
    fetchSceneCollection().then(function(sceneCollection) {
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
