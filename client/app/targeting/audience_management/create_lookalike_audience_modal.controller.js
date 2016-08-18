import toastr from 'toastr';

/*@ngInject*/
function CreateLookalikeAudienceModalController($scope, $uibModalInstance, ezfb, customAudienceService, adAccountId, customAudiences) {
  $scope.customAudiences = _.filter(customAudiences, {subtype: 'CUSTOM'});
  $scope.lookalikeAudience = {};
  fetchCountries();

  $scope.saving = false;
  $scope.save = save;

  function fetchCountries() {
    return ezfb.api('/search', {type: 'adgeolocation', location_types: ['country'], limit: 2000}).then(function (data) {
      $scope.countries = data.data;
    });
  }

  function save() {
    $scope.saving = true;

    customAudienceService.createLookalikeAudience(adAccountId, $scope.lookalikeAudience).then(() => {
      $uibModalInstance.close();
    }, data => {
      toastr.error(data.error.message, 'There was an error creating your lookalike audience');
    }).finally(() => {
      $scope.saving = false;
    });
  }
}

module.exports = CreateLookalikeAudienceModalController;
