var templateUrl = require('./theme_settings.html');
var modalCtrl = require('./configure_audio_modal.controller');
var modalTemplateUrl = require('./configure_audio_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeSettingsController,
  bindings: {
    sceneCollection: '<',
    onUpdate: '&'
  }
};

/*@ngInject*/
function ThemeSettingsController($uibModal, songsService, fontsService) {
  var vm = this;

  vm.$onInit = function () {
    vm.fonts = fontsService.get();
    vm.songs = songsService.get();
  };

  vm.update = update;
  vm.currentSongUrl = currentSongUrl;
  vm.configureAudio = configureAudio;

  function update(prop) {
    vm.onUpdate({prop: prop, value: vm.sceneCollection[prop]});
  }

  function currentSongUrl() {
    var song = _.find(vm.songs, {id: vm.sceneCollection.song_id});

    if (song) {
      return song.url;
    }
  }

  function configureAudio() {
    var modal = $uibModal.open({
      controller: modalCtrl,
      templateUrl: modalTemplateUrl,
      resolve: {
        audioUrl: function () {
          return vm.sceneCollection.audio_url
        }
      }
    });

    modal.result.then(function (audioPath) {
      vm.sceneCollection.audio = audioPath;
      update('audio');
    });

    return modal;
  }
}

module.exports = component;
