import toastr from 'toastr';

/*@ngInject*/
function CreateCustomAudienceModalController($scope, $uibModalInstance, customAudienceService, adAccountId) {
  $scope.customAudience = {};
  $scope.saving = false;
  $scope.save = save;

  function save() {
    $scope.saving = true;

    customAudienceService.create(adAccountId, $scope.customAudience.name, $scope.customAudience.description, $scope.customAudience.file).then(() => {
      $uibModalInstance.close();
    }, () => {
      toastr.error('There was an error creating your custom audience.');
    }).finally(() => {
      $scope.saving = false;
    });
  }
}

module.exports = CreateCustomAudienceModalController;
