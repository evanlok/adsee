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

    pollStreamurl();
  };

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
}

module.exports = component;
