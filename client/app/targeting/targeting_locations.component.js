var templateUrl = require('./targeting_locations.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingLocationsController,
  bindings: {
    sceneCollection: '<'
  }
};

/* @ngInject */
function TargetingLocationsController($state, $q, facebookAdService) {
  var vm = this;

  vm.$onInit = function () {
    vm.saving = false;

    fetchFacebookAd();
  };

  vm.save = save;

  function fetchFacebookAd() {
    return facebookAdService.save({sceneCollectionId: vm.sceneCollection.id}).then(function (data) {
      vm.facebookAd = data;
    });
  }

  function save($event) {
    vm.saving = true;

    var updateTargeting = facebookAdService.updateTargetingSpec({id: vm.facebookAd.id}, {targeting: $event.targetingSpec});
    var updateFacebookAd = facebookAdService.update({id: vm.facebookAd.id}, {ad_account_id: $event.adAccountId});

    $q.all([updateTargeting, updateFacebookAd]).then(function () {
      $state.go('targetingDemographics');
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
