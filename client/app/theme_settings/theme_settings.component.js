var templateUrl = require('./theme_settings.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeSettingsController,
  bindings: {
    sceneCollectionId: '<'
  }
};

function ThemeSettingsController(sceneCollectionService, songsService, fontsService) {
  var vm = this;

  console.log('songs', songsService.get())
  console.log('fonts', fontsService.get())

  sceneCollectionService.get({id: vm.sceneCollectionId}).then(function (data) {
    vm.sceneCollection = data;
  });
}

module.exports = component;
