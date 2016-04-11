var templateUrl = require('./add_scene.html');

var component = {
  templateUrl: templateUrl,
  controller: AddSceneController,
  bindings: {
    onAddScene: '&'
  }
};

function AddSceneController(sceneService) {
  var vm = this;

  vm.$onInit = function () {
    vm.scenes = [];
    vm.scenesChunks = [];

    fetchScenes();
  };

  function fetchScenes() {
    sceneService.query().then(function (data) {
      vm.scenes = data;
      vm.scenesChunks = _.chunk(vm.scenes, 4);
    });
  }
}

module.exports = component;
