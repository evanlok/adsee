var templateUrl = require('./song_player.html');
var Howl = require('howler').Howl;

var component = {
  templateUrl: templateUrl,
  controller: SongPlayerController,
  bindings: {
    url: '@',
    format: '@'
  }
};

/*@ngInject*/
function SongPlayerController($scope) {
  var vm = this;
  var sound;

  vm.$onInit = function () {
    vm.playing = false;

    setupSoundPlayer();
  };

  vm.$onChanges = function () {
    if (sound) {
      sound.unload();
    }

    setupSoundPlayer();
  };

  vm.$onDestroy = function () {
    if (sound) {
      sound.unload();
    }
  };

  vm.play = play;
  vm.stop = stop;

  function setupSoundPlayer() {
    vm.playing = false;

    sound = new Howl({
      urls: [vm.url],
      format: vm.format,
      onend: function () {
        vm.playing = false;
        $scope.$apply();
      }
    });
  }

  function play() {
    sound.play();
    vm.playing = true;
  }

  function stop() {
    sound.stop();
    vm.playing = false;
  }
}

module.exports = component;
