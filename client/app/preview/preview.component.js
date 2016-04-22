var templateUrl = require('./preview.html');

var component = {
  templateUrl: templateUrl,
  controller: PreviewController,
  bindings: {
    videoJobId: '@'
  }
};

/*@ngInject*/
function PreviewController($interval, videoJobService) {
  var vm = this;
  var intervalPromise;

  vm.$onInit = function () {
    vm.videoJob = {};
    vm.publishing = false;

    pollStreamurl();
  };

  vm.publish = publish;

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

  function publish() {
    videoJobService.generate({sceneCollectionId: vm.videoJob.scene_collection_id}).then(function (data) {
      alert('Video has been published!');
    });
  }
}

module.exports = component;
