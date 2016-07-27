var templateUrl = require('./video_settings.html');
var videojs = require('video.js');

var component = {
  templateUrl: templateUrl,
  controller: VideoSettingsController,
  bindings: {
    url: '@',
    startTime: '@',
    endTime: '@',
    duration: '@',
    speed: '@',
    volume: '@',
    onChange: '&'
  }
};

/*@ngInject*/
function VideoSettingsController($element, $scope) {
  var vm = this;
  var player;

  vm.$onInit = function () {
    vm.rangeSliderOptions = {
      floor: 0,
      ceil: vm.duration,
      hideLimitLabels: true,
      step: 0.01,
      precision: 2,
      onChange: rangeSliderChanged
    };

    vm.speedSliderOptions = {
      floor: 0,
      ceil: 4,
      step: 0.25,
      precision: 2,
      onChange: speedSliderChanged
    };

    vm.volumeSliderOptions = {
      floor: 0,
      ceil: 1,
      step: 0.01,
      precision: 2,
      onChange: volumeSliderChanged,
      translate: function (value) {
        return (value * 100).toFixed();
      }
    };

    vm.playing = false;
  };

  vm.$postLink = function () {
    var videoEl = $element.find('video')[0];
    setupVideoJs(videoEl);
  };

  vm.$onChanges = function (changes) {
    if (changes.url) {
      configurePlayer();
    }
  };

  vm.$onDestroy = function () {
    if (player) {
      player.dispose();
    }
  };

  vm.play = play;
  vm.stop = stop;

  function setupVideoJs(videoEl) {
    player = videojs(videoEl, {fluid: true});
    configurePlayer();
  }

  function configurePlayer() {
    if (player) {
      if (vm.url) {
        player.src({src: vm.url, type: 'video/mp4'});
        player.currentTime(vm.startTime);
        player.playbackRate(vm.speed);
        player.volume(vm.volume / 100);

        player.on('ended', function () {
          stop();
          $scope.$apply();
        });

        player.on('timeupdate', function () {
          if (player.currentTime() >= vm.endTime && !player.paused()) {
            stop();
            $scope.$apply();
          }
        });
      }
    }
  }

  function rangeSliderChanged(sliderId, modelValue, highValue, pointerType) {
    if (pointerType === 'min') {
      player.currentTime(vm.startTime);
    } else {
      player.currentTime(vm.endTime);
    }

    outputChanges();
  }

  function speedSliderChanged() {
    player.playbackRate(vm.speed);
    outputChanges();
  }

  function volumeSliderChanged() {
    player.volume(vm.volume / 100);
    outputChanges();
  }

  function outputChanges() {
    vm.onChange({$event: {startTime: vm.startTime, endTime: vm.endTime, speed: vm.speed, volume: vm.volume}});
  }

  function play() {
    vm.playing = true;
    player.currentTime(vm.startTime);
    player.play();
  }

  function stop() {
    vm.playing = false;
    player.pause();
  }
}

module.exports = component;
