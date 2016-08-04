/*@ngInject*/
function NewSceneCollectionModalController($scope, $uibModalInstance, $state, $window, sceneCollectionService, themeId,
                                           skipAspectRatio, targetingSpecId) {
  var steps = ['integration', 'aspect_ratio'];
  $scope.themeId = themeId;
  $scope.saving = false;
  $scope.integration = '';
  $scope.step = 'integration';
  $scope.skipAspectRatio = skipAspectRatio;

  $scope.selectIntegration = function (integration) {
    $scope.integration = integration;

    if ($scope.skipAspectRatio) {
      $scope.save();
    } else {
      $scope.step = 'aspect_ratio';
    }
  };

  $scope.selectAspectRatio = function (aspectRatio) {
    $scope.aspectRatio = aspectRatio;
    $scope.save();
  };

  $scope.back = function () {
    var previousIndex = _.indexOf(steps, $scope.step) - 1;

    if (previousIndex >= 0) {
      $scope.step = steps[previousIndex];
    }
  };

  $scope.save = function () {
    $scope.saving = true;

    sceneCollectionService.save({}, {
      theme_id: $scope.themeId,
      integration: $scope.integration,
      aspect_ratio: $scope.aspectRatio,
      facebook_targeting_spec_ids: [targetingSpecId]
    }).then(function onSuccess(data) {
      $uibModalInstance.close();

      if ($scope.integration === 'facebook_ad') {
        $window.location = $state.href('targeting', {sceneCollectionId: data.id});
      } else {
        $window.location = $state.href('sceneEditor', {sceneCollectionId: data.id});
      }
    });
  };
}

module.exports = NewSceneCollectionModalController;
