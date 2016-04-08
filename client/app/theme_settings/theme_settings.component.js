var templateUrl = require('./theme_settings.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeSettingsController,
  bindings: {
    sceneCollectionId: '<'
  },
  require: {
    sceneEditorCtrl: '^sceneEditor'
  }
};

function ThemeSettingsController(sceneCollectionService, songsService, fontsService) {
  var vm = this;

  vm.fonts = fontsService.get();
  vm.songs = songsService.get();
  vm.updateSceneCollection = updateSceneCollection;

  function updateSceneCollection() {
    sceneCollectionService.update({id: vm.sceneEditorCtrl.sceneCollection.id}, vm.sceneEditorCtrl.sceneCollection).then(function onSuccess(data) {
      vm.sceneEditorCtrl.sceneCollection = data;
    });
  }
}

module.exports = component;
