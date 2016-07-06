var templateUrl = require('./summary.html');
var modalTemplateUrl = require('./published_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: SummaryController,
  bindings: {
    sceneCollection: '<'
  }
};

/*@ngInject*/
function SummaryController($q, $window, $uibModal, $state, sceneCollectionService, userService, videoJobService,
                           facebookAdConfigOptions) {
  var vm = this;

  vm.$onInit = function () {
    vm.loading = true;
    vm.publishing = false;
    vm.facebookAd = {};
    vm.facebookAdConfigOptions = facebookAdConfigOptions;
    vm.pages = [];
    vm.adAccounts = [];

    fetchData();
  };

  vm.$onDestroy = function () {

  };

  vm.pageName = pageName;
  vm.adAccountName = adAccountName;
  vm.publish = publish;
  vm.previousStep = previousStep;

  function fetchData() {
    $q.all([fetchSceneCollection(), fetchUserFacebookData()]).then(function () {
      vm.loading = false;
    });
  }

  function fetchSceneCollection() {
    return sceneCollectionService.summaryInfo({id: vm.sceneCollection.id}).then(function (data) {
      vm.sceneCollection = data;
      vm.facebookAd = data.facebook_ad;
      return data;
    });
  }

  function fetchUserFacebookData() {
    return userService.facebookData().then(function (data) {
      vm.pages = data.pages;
      vm.adAccounts = data.ad_accounts;
    });
  }

  function pageName() {
    var page = _.find(vm.pages, {id: vm.facebookAd.page_id});

    if (page) {
      return page.name;
    } else {
      return 'Invalid Page';
    }
  }

  function adAccountName() {
    var adAccount = _.find(vm.adAccounts, {id: vm.facebookAd.ad_account_id});

    if (adAccount) {
      return adAccount.business_name || adAccount.name;
    } else {
      return 'Invalid Ad Account';
    }
  }

  function publish() {
    vm.publishing = true;

    videoJobService.generate({sceneCollectionId: vm.sceneCollection.id}).then(function () {
      var modal = $uibModal.open({
        templateUrl: modalTemplateUrl
      });

      modal.result.finally(function () {
        $window.location = '/scene_collections';
      });
    }).finally(function () {
      vm.publishing = false;
    });
  }

  function previousStep() {
    fetchSceneCollection().then(function (sceneCollection) {
      if (sceneCollection.integration === 'facebook_ad') {
        $state.go('adConfig', {facebookAdId: vm.facebookAd.id});
      } else {
        $state.go('facebookPostConfig');
      }
    });
  }
}

module.exports = component;
