var templateUrl = require('./ad_config.html');

var component = {
  templateUrl: templateUrl,
  controller: AdConfigController,
  bindings: {
    sceneCollection: '<',
    facebookAd: '<'
  }
};

/*@ngInject*/
function AdConfigController($state, $timeout, userService, facebookAdConfigOptions, stepsNavigator) {
  var vm = this;

  vm.$onInit = function () {
    vm.adOptions = {};
    vm.pages = [];
    vm.adAccounts = [];
    vm.showAdvanced = false;
    vm.start = {opened: false};
    vm.end = {opened: false};
    vm.savingAd = false;
    vm.facebookAdConfigOptions = facebookAdConfigOptions;

    setAdOptions(vm.facebookAd);
    fetchUserFacebookData();
  };

  vm.submitAd = submitAd;
  vm.toggleAdvanced = toggleAdvanced;
  vm.setSchedule = setSchedule;
  vm.resetPacingType = resetPacingType;
  vm.showDatepicker = showDatepicker;
  vm.openStart = openStart;
  vm.openEnd = openEnd;
  vm.adAccountName = adAccountName;
  vm.updateImageUrl = updateImageUrl;
  vm.previousStep = previousStep;

  function fetchUserFacebookData() {
    userService.facebookData().then(function (data) {
      vm.pages = data.pages;
      vm.adAccounts = data.ad_accounts;
    });
  }

  function setAdOptions(facebookAd) {
    vm.adOptions.bidType = facebookAd.bid_amount ? 'manual' : 'automatic';

    if (facebookAd.budget_type === 'daily' && !facebookAd.end_time) {
      vm.adOptions.schedule = 'continuous';
    } else {
      vm.adOptions.schedule = 'scheduled';
    }
  }

  function toggleAdvanced() {
    vm.showAdvanced = !vm.showAdvanced;
  }

  function setSchedule() {
    if (vm.facebookAd.budget_type === 'lifetime') {
      vm.adOptions.schedule = 'scheduled';
    }
  }

  function resetPacingType() {
    vm.facebookAd.pacing_type = 'standard';
  }

  function showDatepicker() {
    return vm.adOptions.schedule === 'scheduled' || vm.facebookAd.budget_type === 'lifetime';
  }

  function openStart() {
    vm.start.opened = true;
  }

  function openEnd() {
    vm.end.opened = true;
  }

  function adAccountName(adAccount) {
    return _.filter([adAccount.business_name, adAccount.name], function (name) {
      return name;
    }).join(' - ');
  }

  function updateImageUrl(url) {
    $timeout(function () {
      vm.facebookAd.image_url = url;
    });
  }

  function previousStep() {
    stepsNavigator.goToPreview(vm.sceneCollection);
  }

  function submitAd() {
    vm.savingAd = true;

    if (vm.adOptions.bidType === 'automatic') {
      vm.facebookAd.bid_amount = null;
    }

    if (vm.adOptions.schedule === 'continuous') {
      vm.facebookAd.start_time = new Date();
      vm.facebookAd.end_time = null;
    }

    vm.facebookAd.$update().then(function () {
      $state.go('summary', {sceneCollectionId: vm.sceneCollection.id});
    }).finally(function () {
      vm.savingAd = false;
    });
  }
}

module.exports = component;
