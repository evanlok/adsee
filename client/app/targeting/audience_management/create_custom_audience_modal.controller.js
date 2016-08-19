import toastr from 'toastr';

/*@ngInject*/
function CreateCustomAudienceModalController($scope, $uibModalInstance, customAudienceService, adAccountId) {
  $scope.customAudience = {};
  $scope.saving = false;
  $scope.save = save;

  function save() {
    $scope.customAudienceForm.$setSubmitted();

    if ($scope.customAudienceForm.$invalid) {
      $scope.$broadcast('show-errors-check-validity');
    } else {
      $scope.saving = true;

      let params = _.omit($scope.customAudience, ['file']);

      customAudienceService.createCustomAudience(adAccountId, params, $scope.customAudience.file).then(() => {
        $uibModalInstance.close();
      }, (data) => {
        toastr.error(data.error.message, 'There was an error creating your custom audience');
      }).finally(() => {
        $scope.saving = false;
      });
    }
  }
}

module.exports = CreateCustomAudienceModalController;
