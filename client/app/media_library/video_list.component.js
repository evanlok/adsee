var templateUrl = require('./video_list.html');

var component = {
  templateUrl: templateUrl,
  controller: VideoListController,
  bindings: {
    videos: '<',
    allowDelete: '@',
    onSelect: '&',
    onDelete: '&'
  }
};

/*@ngInject*/
function VideoListController() {
  var vm = this;

  vm.$onInit = function () {
    vm.groupedVideos = _.chunk(vm.videos, 4);
    vm.showDelete = vm.allowDelete === '';
  };

  vm.$onChanges = function () {
    vm.groupedVideos = _.chunk(vm.videos, 4);
  };
}

module.exports = component;
