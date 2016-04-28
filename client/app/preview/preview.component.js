var templateUrl = require('./preview.html');

var component = {
  templateUrl: templateUrl,
  controller: PreviewController,
  bindings: {
    videoJobId: '@'
  }
};

/*@ngInject*/
function PreviewController($interval, $state, videoJobService, facebookAdService) {
  var vm = this;
  var intervalPromise;

  vm.$onInit = function () {
    vm.videoJob = {};
    vm.creatingAd = false;

    pollStreamurl();
  };

  vm.$onDestroy = function () {
    $interval.cancel(intervalPromise);
  };

  vm.configureAd = configureAd;

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

  function configureAd() {
    vm.creatingAd = true;

    facebookAdService.save({sceneCollectionId: vm.videoJob.scene_collection_id}).then(function (data) {
      $state.go('adConfig', {facebookAdId: data.id});
    }).finally(function () {
      vm.creatingAd = false;
    });
  }
}

module.exports = component;
