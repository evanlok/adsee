var templateUrl = require('./facebook_post_config.html');

var component = {
  templateUrl: templateUrl,
  controller: FacebookPostConfigController,
  bindings: {
    sceneCollection: '<'
  }
};

/*@ngInject*/
function FacebookPostConfigController($state, sceneCollectionService, userService, facebookAdConfigOptions, stepsNavigator) {
  var vm = this;

  vm.$onInit = function () {
    vm.facebookPages = [];
    vm.facebookPostParams = {};
    vm.facebookAdConfigOptions = facebookAdConfigOptions;
    vm.saving = false;
    vm.callToActionChanged = callToActionChanged;
    vm.facebookPostParams = vm.sceneCollection.integration_data;

    fetchFacebookPages();
  };

  vm.save = save;
  vm.showCallToActionField = showCallToActionField;
  vm.showCallToActionSubfields = showCallToActionSubfields;
  vm.previousStep = previousStep;

  function fetchFacebookPages() {
    userService.facebookPages().then(function (data) {
      vm.facebookPages = data;
    });
  }

  function save() {
    vm.saving = true;

    sceneCollectionService.update({id: vm.sceneCollection.id}, {integration_data: vm.facebookPostParams}).then(function () {
      $state.go('summary', {sceneCollectionId: vm.sceneCollection.id});
    }).finally(function () {
      vm.saving = false;
    });
  }
  
  function showCallToActionField() {
    return vm.sceneCollection.integration === 'facebook_page_post';
  }

  function showCallToActionSubfields() {
    return showCallToActionField() && _.has(vm.facebookPostParams, 'call_to_action.type');
  }

  function callToActionChanged() {
    if (!vm.facebookPostParams.call_to_action.type) {
      delete vm.facebookPostParams.call_to_action;
    }
  }

  function previousStep() {
    stepsNavigator.goToPreview(vm.sceneCollection);
  }
}

module.exports = component;
