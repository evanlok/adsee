/*@ngInject*/
function VideoModalController($scope, $uibModalInstance, $timeout, sceneAttribute, modalConfig) {
  $scope.sceneAttribute = sceneAttribute;
  $scope.config = {start_time: 0, end_time: sceneAttribute.duration, speed: 1, volume: 1};
  $scope.config = angular.extend($scope.config, $scope.sceneAttribute.config);

  $uibModalInstance.rendered.then(function () {
    $timeout(function () {
      $scope.$broadcast('rzSliderForceRender');
    });
  });

  $scope.selectFilter = selectFilter;
  $scope.resetFilter = resetFilter;
  $scope.updateColorSettings = updateColorSettings;
  $scope.updateVideoConfig = updateVideoConfig;
  $scope.save = save;

  $scope.$on('modal.closing', function (e) {
    if (modalConfig.disableBackdropClose()) {
      e.preventDefault();
    }
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

  function updateVideoConfig($event) {
    $scope.config.start_time = $event.startTime;
    $scope.config.end_time = $event.endTime;
    $scope.config.speed = $event.speed;
    $scope.config.volume = $event.volume;
  }

  function save() {
    $scope.config.duration = $scope.config.end_time - $scope.config.start_time;

    $uibModalInstance.close($scope.config);
  }
}

module.exports = VideoModalController;
