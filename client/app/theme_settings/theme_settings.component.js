var templateUrl = require('./theme_settings.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeSettingsController,
  bindings: {
    sceneCollection: '<',
    onUpdate: '&'
  }
};

/*@ngInject*/
function ThemeSettingsController(songsService, fontsService) {
  var vm = this;

  vm.$onInit = function () {
    vm.fonts = fontsService.get();
    vm.songs = songsService.get();
  };

  vm.update = update;
  vm.currentSongUrl = currentSongUrl;

  function update(prop) {
    vm.onUpdate({prop: prop, value: vm.sceneCollection[prop]});
  }

  function currentSongUrl() {
    var song = _.find(vm.songs, {id: vm.sceneCollection.song_id});

    if (song) {
      return song.url;
    }
  }
}

module.exports = component;
