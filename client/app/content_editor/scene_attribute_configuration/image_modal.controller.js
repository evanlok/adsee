/*@ngInject*/
function ImageModalController($scope, $uibModalInstance, sceneAttribute) {
  $scope.sceneAttribute = sceneAttribute;
  $scope.config = angular.copy($scope.sceneAttribute.config) || {};

  $scope.save = save;
  $scope.selectFilter = selectFilter;
  $scope.resetFilter = resetFilter;

  function selectFilter(filter) {
    $scope.config.filter = filter.value;
  }

  function resetFilter() {
    delete $scope.config.filter;
  }

  function save() {
    $uibModalInstance.close($scope.config);
  }
}

module.exports = ImageModalController;
