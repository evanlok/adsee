var templateUrl = require('./summary.html');

var component = {
  templateUrl: templateUrl,
  controller: SummaryController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function SummaryController($q, sceneCollectionService, userService, videoJobService, facebookAdConfigOptions) {
  var vm = this;

  vm.$onInit = function () {
    vm.loading = true;
    vm.publishing = false;
    vm.sceneCollection = {};
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

  function fetchData() {
    $q.all([fetchSceneCollection(), fetchUserFacebookData()]).then(function () {
      vm.loading = false;
    });
  }

  function fetchSceneCollection() {
    return sceneCollectionService.summaryInfo({id: vm.sceneCollectionId}).then(function (data) {
      vm.sceneCollection = data;
      vm.facebookAd = data.facebook_ad;
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

    videoJobService.generate({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      alert('Video has been published!');
    }).finally(function () {
      vm.publishing = false;
    });
  }
}

module.exports = component;
