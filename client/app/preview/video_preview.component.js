var templateUrl = require('./video_preview.html');
var videojs = require('video.js');
require('videojs-contrib-hls/dist/videojs-contrib-hls');

var component = {
  templateUrl: templateUrl,
  controller: VideoPreviewController,
  bindings: {
    streamUrl: '@'
  }
};

/*@ngInject*/
function VideoPreviewController($interval, $http) {
  var vm = this;
  var player;
  var streamUrlIntervalPromise;

  vm.$postLink = function () {
    setupVideoJs();
  };

  vm.$onChanges = function () {
    if (vm.streamUrl) {
      waitForStream();
    }
  };

  vm.$onDestroy = function () {
    if (player) {
      player.dispose();
    }

    $interval.cancel(streamUrlIntervalPromise);
  };

  function setupVideoJs() {
    player = videojs('preview-video', {fluid: true}, function () {
      // Player (this) is initialized and ready.
      if (vm.streamUrl) {
        waitForStream();
      }
    });
  }

  function playVideo() {
    player.src({src: vm.streamUrl, type: 'application/x-mpegURL'});
    player.play();
  }

  function waitForStream() {
    streamUrlIntervalPromise = $interval(function () {
      fetchStreamUrl();
    }, 1000);
  }

  function fetchStreamUrl() {
    $http.get(vm.streamUrl).then(function onSuccess() {
      $interval.cancel(streamUrlIntervalPromise);
      playVideo();
    });
  }
}

module.exports = component;
