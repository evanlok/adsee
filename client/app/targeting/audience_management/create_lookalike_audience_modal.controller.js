import toastr from 'toastr';

/*@ngInject*/
function CreateLookalikeAudienceModalController($scope, $timeout, $uibModalInstance, ezfb, customAudienceService,
                                                adAccountId, customAudiences) {
  $scope.customAudiences = _.filter(customAudiences, {subtype: 'CUSTOM'});
  $scope.lookalikeAudience = {};
  $scope.displayCustomAudienceSize = false;
  $scope.ratioSliderOptions = {
    floor: 0,
    ceil: 0.2,
    step: 0.01,
    precision: 2,
    translate: function (value) {
      return (value * 100).toFixed() + '%';
    },
  };

  fetchCountries();

  $scope.saving = false;
  $scope.showError = showError;
  $scope.showCustomAudienceSizing = showCustomAudienceSizing;
  $scope.showBasicAudienceSizing = showBasicAudienceSizing;
  $scope.save = save;

  function fetchCountries() {
    return ezfb.api('/search', {type: 'adgeolocation', location_types: ['country'], limit: 2000}).then(function (data) {
      $scope.countries = data.data;
    });
  }

  function showError(field) {
    if ($scope.lookalikeAudienceForm[field] && ($scope.lookalikeAudienceForm.$submitted || $scope.lookalikeAudienceForm[field].$dirty)) {
      return $scope.lookalikeAudienceForm[field].$invalid;
    } else {
      return false;
    }
  }

  function showCustomAudienceSizing() {
    $scope.lookalikeAudience.lookalike_spec = {starting_ratio: 0, ratio: 0.03};
    $scope.displayCustomAudienceSize = true;
  }

  function showBasicAudienceSizing() {
    delete $scope.lookalikeAudience.lookalike_spec;
    $scope.displayCustomAudienceSize = false;
  }

  function save() {
    $scope.lookalikeAudienceForm.$setSubmitted();

    if ($scope.lookalikeAudienceForm.$invalid) {
      $scope.$broadcast('show-errors-check-validity');
    } else {
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
}

module.exports = CreateLookalikeAudienceModalController;
