/*@ngInject*/
function VideoModalController($scope, $uibModalInstance, video, selecting) {
  $scope.video = video;
  $scope.selecting = selecting;

  $scope.selectVideo = function() {
    $uibModalInstance.close(video);
  };
}

module.exports = VideoModalController;
