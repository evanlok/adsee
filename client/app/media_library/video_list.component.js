var templateUrl = require('./video_list.html');
var modalCtrl = require('./video_modal.controller');
var modalTemplateUrl = require('./video_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: VideoListController,
  bindings: {
    videos: '<',
    allowDelete: '@',
    selecting: '<',
    onSelect: '&',
    onDelete: '&'
  }
};

/*@ngInject*/
function VideoListController($uibModal) {
  var vm = this;

  vm.$onInit = function () {
    vm.groupedVideos = _.chunk(vm.videos, 20);
    vm.showDelete = vm.allowDelete === '';
  };

  vm.$onChanges = function () {
    vm.groupedVideos = _.chunk(vm.videos, 20);
  };

  vm.openVideoModal = openVideoModal;

  function openVideoModal(video) {
    var modal = $uibModal.open({
      controller: modalCtrl,
      size: 'lg',
      templateUrl: modalTemplateUrl,
      resolve: {
        video: function () {
          return video;
        },
        selecting: function () {
          return vm.selecting;
        }
      }
    });

    modal.result.then(function (video) {
      vm.onSelect({video: video});
    });
  }
}

module.exports = component;
