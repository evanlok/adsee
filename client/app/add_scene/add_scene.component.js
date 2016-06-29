var templateUrl = require('./add_scene.html');
var modalCtrl = require('./select_scene_modal.controller');
var modalTemplateUrl = require('./select_scene_modal.html');

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
function AddSceneController($uibModal, sceneService) {
  var vm = this;

  vm.$onInit = function () {
    vm.scenes = [];
    vm.groupedScenes = {};

    fetchScenes();
  };

  vm.openSceneModal = openSceneModal;

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

  function openSceneModal(scene) {
    var modal = $uibModal.open({
      controller: modalCtrl,
      size: 'lg',
      templateUrl: modalTemplateUrl,
      resolve: {
        scene: function () {
          return scene;
        }
      }
    });

    modal.result.then(function (scene) {
      vm.onAddScene({scene: scene})
    });
  }
}

module.exports = component;
