var templateUrl = require('./song_player.html');
var Howl = require('howler').Howl;

var component = {
  templateUrl: templateUrl,
  controller: SongPlayerController,
  bindings: {
    url: '@'
  }
};

/*@ngInject*/
function SongPlayerController() {
  var vm = this;
  var sound;

  vm.$onInit = function () {
    vm.playing = false;

    setupSoundPlayer();
  };

  vm.$onChanges = function () {
    sound.unload();
    setupSoundPlayer();
  };

  vm.$onDestroy = function () {
    sound.unload();
  };

  vm.play = play;
  vm.stop = stop;

  function setupSoundPlayer() {
    vm.playing = false;

    sound = new Howl({
      urls: [vm.url],
      onEnd: function () {
        vm.playing = false;
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
