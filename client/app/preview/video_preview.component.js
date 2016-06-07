var templateUrl = require('./video_preview.html');
var $script = require('scriptjs');

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
    setupPlayer();
  };

  vm.$onChanges = function () {
    if (vm.streamUrl) {
      waitForStream();
    }
  };

  vm.$onDestroy = function () {
    if (player) {
      player.remove();
    }

    $interval.cancel(streamUrlIntervalPromise);
  };

  function setupPlayer() {
    $script('https://content.jwplatform.com/libraries/irXDvUdv.js', function () {
      player = jwplayer('preview-video');
      player.setup({
        image: 'https://vejeo.s3.amazonaws.com/videos/video-preroll-image.jpg',
        hlshtml: true,
        file: 'https://video-snippets.s3.amazonaws.com/encoded/7755/7eec523e-7fc4-4bd7-918f-25c29a5e490e_720.mp4',
        autostart: true,
        aspectratio: '16:9'
      });

      player.on('ready', function () {
        if (vm.streamUrl) {
          waitForStream();
        }
      });
    });
  }

  function playVideo() {
    player.load([{file: vm.streamUrl}]);
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
