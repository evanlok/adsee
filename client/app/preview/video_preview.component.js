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
function VideoPreviewController($timeout, $http, $q) {
  var vm = this;
  var player;
  var streamUrlIntervalPromise;
  var cancelHttp;
  var playerReady = false;

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

    if (cancelHttp) {
      cancelHttp.resolve();
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
        playerReady = true;
      });
    });
  }

  function playVideo() {
    if (playerReady) {
      player.stop();
      player.load([{file: vm.streamUrl}]);
    } else {
      $timeout(playVideo, 500);
    }
  }

  function fetchStreamUrl() {
    cancelHttp = $q.defer();

    return $http.get(vm.streamUrl, {timeout: cancelHttp.promise}).then(function onSuccess() {
      playVideo();
    }, function onError() {
      streamUrlIntervalPromise = $timeout(fetchStreamUrl, 1500);
    });
  }
}

module.exports = component;
