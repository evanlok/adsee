var templateUrl = require('./video_list.html');

var component = {
  templateUrl: templateUrl,
  controller: VideoListController,
  bindings: {
    videos: '<',
    onSelect: '&'
  }
};

/*@ngInject*/
function VideoListController() {
  var vm = this;

  vm.$onInit = function () {
    vm.groupedVideos = _.chunk(vm.videos, 2);
  };

  vm.$onChanges = function () {
    vm.groupedVideos = _.chunk(vm.videos, 2);
  };
}

module.exports = component;
