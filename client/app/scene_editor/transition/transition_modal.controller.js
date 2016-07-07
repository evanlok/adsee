/*@ngInject*/
function TransitionModalController($scope, $uibModalInstance, selectedTransition, transitionsService) {
  $scope.selectedTransition = selectedTransition;
  $scope.transitionGroups = _.chunk(transitionsService.get(), 3);

  $scope.removeTransition = removeTransition;

  function removeTransition() {
    $uibModalInstance.close({id: null});
  }
}

module.exports = TransitionModalController;
