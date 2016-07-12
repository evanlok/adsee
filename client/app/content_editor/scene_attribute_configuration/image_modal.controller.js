/*@ngInject*/
function ImageModalController($scope, $uibModalInstance, filters, sceneAttribute) {
  $scope.sceneAttribute = sceneAttribute;
  $scope.config = angular.copy($scope.sceneAttribute.config) || {};
  $scope.filters = filters;

  $scope.save = save;

  function save() {
    if ($scope.config.filter) {
      var filter = _.find($scope.filters, {value: $scope.config.filter});

      if (filter && filter.param) {
        $scope.config.filter_param = filter.param;
      }
    }

    $uibModalInstance.close($scope.config);
  }
}

module.exports = ImageModalController;
