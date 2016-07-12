/*@ngInject*/
function VideoModalController($scope, $uibModalInstance, $timeout, filters, sceneAttribute) {
  $scope.sceneAttribute = sceneAttribute;
  $scope.config = {start_time: 0, end_time: sceneAttribute.duration, speed: 1, volume: 1};
  $scope.config = angular.extend($scope.config, $scope.sceneAttribute.config);
  $scope.config.volume = $scope.config.volume * 100; // Slider range uses 0-100
  $scope.filters = filters;

  $scope.sliderOptions = {
    floor: 0,
    ceil: sceneAttribute.duration,
    hideLimitLabels: true
  };

  $uibModalInstance.rendered.then(function () {
    $timeout(function () {
      $scope.$broadcast('rzSliderForceRender');
    });
  });

  $scope.save = save;

  function save() {
    $scope.config.duration = $scope.config.end_time - $scope.config.start_time;
    $scope.config.volume = $scope.config.volume / 100;

    if ($scope.config.filter) {
      var filter = _.find($scope.filters, {value: $scope.config.filter});

      if (filter && filter.param) {
        $scope.config.filter_param = filter.param;
      }
    }

    $uibModalInstance.close($scope.config);
  }
}

module.exports = VideoModalController;
