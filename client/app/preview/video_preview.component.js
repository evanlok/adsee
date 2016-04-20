var templateUrl = require('./video_preview.html');
var videojs = require('video.js');
require('videojs-contrib-hls/dist/videojs.hls');

var component = {
  templateUrl: templateUrl,
  controller: VideoPreviewController,
  bindings: {
    streamUrl: '@'
  }
};

/*@ngInject*/
function VideoPreviewController() {
  var vm = this;
  var player;

  vm.$postLink = function () {
    setupVideoJs();
  };

  vm.$onChanges = function () {
    if (vm.streamUrl) {
      playVideo();
    }
  };

  vm.$onDestroy = function () {
    if (player) {
      player.dispose();
    }
  };

  function setupVideoJs() {
    player = videojs('preview-video', {fluid: true}, function () {
      // Player (this) is initialized and ready.
      if (vm.streamUrl) {
        playVideo();
      }
    });
  }

  function playVideo() {
    player.src({src: vm.streamUrl, type: 'application/x-mpegURL'});
  }
}

module.exports = component;
