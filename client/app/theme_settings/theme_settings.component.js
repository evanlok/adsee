var templateUrl = require('./theme_settings.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeSettingsController,
  bindings: {
    sceneCollection: '<',
    onUpdate: '&'
  }
};

/*@ngInject*/ function ThemeSettingsController(songsService, fontsService) {
  var vm = this;

  vm.$onInit = function () {
    vm.fonts = fontsService.get();
    vm.songs = songsService.get();
  };

  vm.update = update;

  function update(prop) {
    vm.onUpdate({prop: prop, value: vm.sceneCollection[prop]});
  }
}

module.exports = component;
