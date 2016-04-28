var templateUrl = require('./summary.html');

var component = {
  templateUrl: templateUrl,
  controller: SummaryController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function SummaryController($state, sceneCollectionService, facebookAdService, videoJobService) {
  var vm = this;

  vm.$onInit = function () {
    vm.publishing = false;
  };

  vm.$onDestroy = function () {

  };

  vm.publish = publish;

  function publish() {
    vm.publishing = true;

    videoJobService.generate({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      alert('Video has been published!');
    }).finally(function () {
      vm.publishing = false;
    });
  }
}

module.exports = component;
