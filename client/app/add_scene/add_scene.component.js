var templateUrl = require('./add_scene.html');

var component = {
  templateUrl: templateUrl,
  controller: AddSceneController,
  bindings: {
    aspectRatio: '@',
    onAddScene: '&',
    onClose: '&'
  }
};

/*@ngInject*/
function AddSceneController(sceneService) {
  var vm = this;

  vm.$onInit = function () {
    vm.scenes = [];
    vm.groupedScenes = {};

    fetchScenes();
  };

  function fetchScenes() {
    sceneService.query({aspect_ratio: vm.aspectRatio}).then(function (data) {
      vm.scenes = data;

      vm.groupedScenes = _.groupBy(data, 'category');

      _.each(vm.groupedScenes, function (scenes, category) {
        if (category === 'null') {
          delete vm.groupedScenes[category];
          category = 'Uncategorized';
        }

        vm.groupedScenes[category] = _.chunk(scenes, 30);
      });

    });
  }
}

module.exports = component;
