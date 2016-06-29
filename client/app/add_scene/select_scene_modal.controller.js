/*@ngInject*/
function SelectSceneModalController($scope, $uibModalInstance, scene) {
  $scope.scene = scene;

  $scope.selectScene = function() {
    $uibModalInstance.close(scene);
  };
}

module.exports = SelectSceneModalController;
