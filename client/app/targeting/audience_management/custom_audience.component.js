var templateUrl = require('./custom_audience.html');
var createCustomAudienceModalCtrl = require('./create_custom_audience_modal.controller');
var createCustomAudienceModalTemplateUrl = require('./create_custom_audience_modal.html');

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
function CustomAudienceController(ezfb, $uibModal) {
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

  function fetchCustomAudiences() {
    return ezfb.api(vm.adAccountId + '/customaudiences', {fields: 'id, approximate_count, data_source, name, description, subtype, time_created, operation_status'}).then(function (data) {
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
}

module.exports = component;
