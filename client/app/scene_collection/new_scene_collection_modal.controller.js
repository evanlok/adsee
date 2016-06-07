/*@ngInject*/
function NewSceneCollectionModalController($scope, $sce, $uibModalInstance, $state, $window, sceneCollectionService, adTypeId,
                                           themeId) {
  $scope.adTypeId = adTypeId;
  $scope.themeId = themeId;
  $scope.saving = false;
  $scope.integration = '';
  $scope.fbad = 'https://vejeo.s3.amazonaws.com/vidgenie/images/sample-photos/fbad_graphic.jpg';
  $scope.fbpage = 'https://vejeo.s3.amazonaws.com/vidgenie/images/sample-photos/fbpage_graphic.jpg';
  $scope.fbprofile = 'https://vejeo.s3.amazonaws.com/vidgenie/images/sample-photos/fbprofile_graphic.jpg';

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
