var templateUrl = require('./custom_audience.html');
var createCustomAudienceModalCtrl = require('./create_custom_audience_modal.controller');
var createCustomAudienceModalTemplateUrl = require('./create_custom_audience_modal.html');
var createLookalikeAudienceModalCtrl = require('./create_lookalike_audience_modal.controller');
var createLookalikeAudienceModalTemplateUrl = require('./create_lookalike_audience_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: CustomAudienceController,
  bindings: {
    facebookCustomAudiences: '<',
    adAccountId: '@',
    onUpdate: '&'
  }
};

/* @ngInject */
function CustomAudienceController(ezfb, $uibModal, customAudienceService) {
  var vm = this;

  vm.$onInit = function () {
    vm.loaded = false;

    ezfb.getLoginStatus().then(function () {
      vm.loaded = true;
    });
  };

  vm.$onChanges = function (changes) {
    if (changes.adAccountId) {
      fetchCustomAudiences();
    }
  };

  vm.onSelectChange = onSelectChange;
  vm.createCustomAudience = createCustomAudience;
  vm.createLookalikeAudience = createLookalikeAudience;

  function fetchCustomAudiences() {
    return customAudienceService.query(vm.adAccountId).then(function (data) {
      vm.customAudiences = data.data;
      vm.selectedCustomAudiences = _.intersectionBy(vm.customAudiences, vm.facebookCustomAudiences, 'id');
    });
  }

  function onSelectChange() {
    var normalizedCustomAudiences = _.map(vm.selectedCustomAudiences, function (item) {
      return _.pick(item, ['id']);
    });

    vm.onUpdate({$event: {customAudiences: normalizedCustomAudiences}});
  }

  function createCustomAudience() {
    var modal = $uibModal.open({
      controller: createCustomAudienceModalCtrl,
      templateUrl: createCustomAudienceModalTemplateUrl,
      resolve: {
        adAccountId: function () {
          return vm.adAccountId;
        }
      }
    });

    modal.result.then(function () {
      fetchCustomAudiences();
    });
  }

  function createLookalikeAudience() {
    var modal = $uibModal.open({
      controller: createLookalikeAudienceModalCtrl,
      templateUrl: createLookalikeAudienceModalTemplateUrl,
      resolve: {
        adAccountId: function () {
          return vm.adAccountId;
        },
        customAudiences: function () {
          return vm.customAudiences;
        }
      }
    });

    modal.result.then(function () {
      fetchCustomAudiences();
    });
  }
}

module.exports = component;
