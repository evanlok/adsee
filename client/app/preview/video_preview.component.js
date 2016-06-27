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
function VideoPreviewController($interval, $timeout, $http) {
  var vm = this;
  var player;
  var streamUrlIntervalPromise;

  vm.$postLink = function () {
    setupPlayer();
  };

  vm.$onChanges = function () {
    if (vm.streamUrl) {
      fetchStreamUrl();
    }
  };

  vm.$onDestroy = function () {
    if (player) {
      player.remove();
    }

    $timeout.cancel(streamUrlIntervalPromise);
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
          fetchStreamUrl();
        }
      });
    });
  }

  function playVideo() {
    player.load([{file: vm.streamUrl}]);
  }

  function fetchStreamUrl() {
    return $http.get(vm.streamUrl).then(function onSuccess() {
      playVideo();
    }, function onError() {
      streamUrlIntervalPromise = $timeout(fetchStreamUrl, 1500);
    });
  }
}

module.exports = component;
