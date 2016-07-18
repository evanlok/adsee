var templateUrl = require('./transition_config.html');
var transitionModalCtrl = require('./transition_modal.controller');
var transitionModalTemplateUrl = require('./transition_modal.html');

var component = {
  templateUrl: templateUrl,
  controller: TransitionConfigController,
  bindings: {
    sceneContent: '<',
    onUpdateTransition: '&'
  },
  transclude: true
};

/*@ngInject*/
function TransitionConfigController($uibModal, transitionsService) {
  var vm = this;

  vm.$onChanges = function (changes) {
    if (changes.sceneContent && changes.sceneContent.currentValue) {
      vm.selectedTransition = _.find(transitionsService.get(), {id: vm.sceneContent.transition_id});
    }
  };

  vm.openTransitionModal = openTransitionModal;

  function openTransitionModal() {
    var modal = $uibModal.open({
      controller: transitionModalCtrl,
      size: 'lg',
      templateUrl: transitionModalTemplateUrl,
      resolve: {
        selectedTransition: function () {
          return vm.selectedTransition;
        }
      }
    });

    modal.result.then(function (transition) {
      vm.sceneContent.transition_id = transition.id;
      vm.onUpdateTransition({$event: {sceneContent: vm.sceneContent}});
    });
  }
}

module.exports = component;
