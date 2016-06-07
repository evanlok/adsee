/*@ngInject*/
function NewSceneCollectionModalController($scope, $uibModalInstance, $state, $window, sceneCollectionService, adTypeId,
                                           themeId) {
  $scope.adTypeId = adTypeId;
  $scope.themeId = themeId;
  $scope.saving = false;
  $scope.integration = '';

  $scope.save = function () {
    $scope.saving = true;

    sceneCollectionService.save({}, {
      ad_type_id: $scope.adTypeId,
      theme_id: $scope.themeId,
      integration: $scope.integration
    }).then(function onSuccess(data) {
      console.log(data)

      $uibModalInstance.close();

      if ($scope.integration === 'facebook_ad') {
        $window.location = $state.href('targeting', {sceneCollectionId: data.id});
      } else {
        $window.location = $state.href('sceneEditor', {sceneCollectionId: data.id});
      }
    });
  }
}

module.exports = NewSceneCollectionModalController;
