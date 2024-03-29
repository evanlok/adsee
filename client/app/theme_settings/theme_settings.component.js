var templateUrl = require('./theme_settings.html');
var modalCtrl = require('./configure_audio_modal.controller');
var modalTemplateUrl = require('./configure_audio_modal.html');
var fontModalCtrl = require('./font_modal.controller');
var fontModalTemplateUrl = require('./font_modal.html');
var songModalCtrl = require('./song_modal.controller');
var songModalTemplateUrl = require('./song_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeSettingsController,
  bindings: {
    sceneCollection: '<',
    duration: '<',
    onUpdate: '&'
  },
  require: {
    sceneEditor: '^^'
  }
};

/*@ngInject*/
function ThemeSettingsController($uibModal, $q, songsService, fontsService) {
  var vm = this;

  vm.$onInit = function () {
    vm.colorPickerOptions = {format: 'hex', swatchPos: 'right', placeholder: 'Pick a color'};

    $q.all([fetchFonts(), fetchSongs()]).then(function () {
      setCurrentSongAndFont();
    });
  };

  vm.$onChanges = function (changes) {
    if (changes.sceneCollection) {
      setCurrentSongAndFont();
    }
  };

  vm.update = update;
  vm.currentSongUrl = currentSongUrl;
  vm.configureAudio = configureAudio;
  vm.configureFont = configureFont;
  vm.configureSong = configureSong;
  vm.colorChanged = colorChanged;

  function fetchFonts() {
    return fontsService.query().then(function (data) {
      vm.fonts = data;
    });
  }

  function fetchSongs() {
    return songsService.query().then(function (data) {
      vm.songs = data;
    });
  }

  function setCurrentSongAndFont() {
    vm.currentFont = _.find(vm.fonts, {id: vm.sceneCollection.font_id});
    vm.currentSong = _.find(vm.songs, {id: vm.sceneCollection.song_id});
  }

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
          return vm.sceneCollection.audio_url;
        },
        duration: function () {
          return vm.duration;
        }
      }
    });

    modal.result.then(function (audioPath) {
      vm.sceneCollection.audio = audioPath;
      update('audio');
    });

    return modal;
  }

  function configureFont() {
    var modal = $uibModal.open({
      controller: fontModalCtrl,
      templateUrl: fontModalTemplateUrl,
      size: 'lg',
      windowClass: 'configure-font-modal',
      resolve: {
        currentFont: function () {
          return vm.currentFont;
        }
      }
    });

    modal.result.then(function (font) {
      vm.sceneCollection.font_id = font.id;
      update('font_id');
    });
  }

  function configureSong() {
    var modal = $uibModal.open({
      controller: songModalCtrl,
      templateUrl: songModalTemplateUrl,
      size: 'lg',
      windowClass: 'configure-song-modal',
      resolve: {
        currentSong: function () {
          return vm.currentSong;
        }
      }
    });

    modal.result.then(function (font) {
      vm.sceneCollection.song_id = font.id;
      update('song_id');
    });
  }

  function colorChanged() {
    update('color');
  }
}

module.exports = component;
