var templateUrl = require('./video_player.html');
var videojs = require('video.js');

var component = {
  templateUrl: templateUrl,
  controller: VideoPlayerController,
  bindings: {
    url: '@',
    poster: '@',
    autoplay: '@'
  }
};

/*@ngInject*/
function VideoPlayerController($element) {
  var vm = this;
  var player;

  vm.$postLink = function () {
    var videoEl = $element.find('video')[0];
    setupVideoJs(videoEl);
  };

  vm.$onChanges = function () {
    configurePlayer();
  };

  vm.$onDestroy = function () {
    if (player) {
      player.dispose();
    }
  };

  function setupVideoJs(videoEl) {
    player = videojs(videoEl, {fluid: true, autoplay: vm.autoplay});
    configurePlayer();
  }

  function configurePlayer() {
    if (player) {
      if (vm.poster) {
        player.poster(vm.poster);
      }

      if (vm.url) {
        player.src({src: vm.url, type: 'video/mp4'});
      }
    }
  }
}

module.exports = component;
