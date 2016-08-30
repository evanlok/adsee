var templateUrl = require('./targeting_demographics.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingDemographicsController,
  bindings: {
    sceneCollection: '<'
  },
  require: {
    sceneCollectionWizard: '^^'
  }
};

/* @ngInject */
function TargetingDemographicsController($state, $q, facebookAdService) {
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

    var updatePromise = facebookAdService.update({id: vm.facebookAd.id}, {advanced: true});
    var targetingUpdatePromise = facebookAdService.updateTargetingSpec({id: vm.facebookAd.id}, {targeting: $event.targetingSpec});
    var scPromise = vm.sceneCollectionWizard.reloadSceneCollection();

    $q.all([updatePromise, targetingUpdatePromise, scPromise]).then(function () {
      $state.go('themes');
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
