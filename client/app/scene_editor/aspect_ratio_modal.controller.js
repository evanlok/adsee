/*@ngInject*/
function AspectRatioModalController($scope, aspectRatio) {
  $scope.aspectRatio = aspectRatio || '1:1';
}

module.exports = AspectRatioModalController;
