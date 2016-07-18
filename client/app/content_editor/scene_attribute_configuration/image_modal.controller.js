/*@ngInject*/
function ImageModalController($scope, $uibModalInstance, $timeout, sceneAttribute) {
  $scope.sceneAttribute = sceneAttribute;
  $scope.config = angular.copy($scope.sceneAttribute.config) || {};

  $scope.save = save;
  $scope.selectFilter = selectFilter;
  $scope.resetFilter = resetFilter;
  $scope.updateColorSettings = updateColorSettings;

  $uibModalInstance.rendered.then(function () {
    $timeout(function () {
      $scope.$broadcast('rzSliderForceRender');
    });
  });

  function selectFilter(filter) {
    $scope.config.filter = filter.value;
  }

  function resetFilter() {
    delete $scope.config.filter;
  }

  function updateColorSettings(config) {
    _.assign($scope.config, config);
  }

  function save() {
    $uibModalInstance.close($scope.config);
  }
}

module.exports = ImageModalController;
