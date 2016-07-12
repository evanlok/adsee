/*@ngInject*/
function TextModalController($scope, $uibModalInstance, sceneAttribute) {
  $scope.sceneAttribute = sceneAttribute;
  $scope.config = angular.copy($scope.sceneAttribute.config) || {};

  $scope.editColor = editColor;
  $scope.editBackgroundColor = editBackgroundColor;
  $scope.resetColor = resetColor;
  $scope.resetBackgroundColor = resetBackgroundColor;
  $scope.save = save;

  function editColor() {
    $scope.editingColor = true;
  }

  function editBackgroundColor() {
    $scope.editingBackgroundColor = true;
  }

  function resetColor() {
    $scope.editingColor = false;
    delete $scope.config.color;
  }

  function resetBackgroundColor() {
    $scope.editingBackgroundColor = false;
    delete $scope.config.background_color;
  }

  function save() {
    $uibModalInstance.close($scope.config);
  }
}

module.exports = TextModalController;
