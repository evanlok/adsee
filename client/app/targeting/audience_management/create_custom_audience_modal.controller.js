import toastr from 'toastr';

/*@ngInject*/
function CreateCustomAudienceModalController($scope, $uibModalInstance, customAudienceService, adAccountId) {
  $scope.customAudience = {};
  $scope.saving = false;
  $scope.save = save;

  function save() {
    $scope.saving = true;

    let params = _.omit($scope.customAudience, ['file']);

    customAudienceService.createCustomAudience(adAccountId, params, $scope.customAudience.file).then(data => {
      if (data.error) {
        toastr.error(data.error.message, 'There was an error creating your custom audience');
      } else {
        $uibModalInstance.close();
      }
    }, () => {
      toastr.error('There was an error parsing your file');
    }).finally(() => {
      $scope.saving = false;
    });
  }
}

module.exports = CreateCustomAudienceModalController;
