/*@ngInject*/
function VideoOverlayLinkModalController($scope, $uibModalInstance, url, poster, autoplay) {
  $scope.url = url;
  $scope.poster = poster;
  $scope.autoplay = autoplay;
}

module.exports = VideoOverlayLinkModalController;
