/*@ngInject*/
function stepsNavigator($state, videoJobService, facebookAdService) {
  this.goToTargeting = function (sceneCollection) {
    if (sceneCollection.advanced_targeting) {
      $state.go('targetingLocations');
    } else {
      $state.go('targeting');
    }
  };

  this.goToPreview = function (sceneCollection) {
    videoJobService.query({sceneCollectionId: sceneCollection.id}).then(function (data) {
      $state.go('preview', {videoJobId: data[0].id});
    });
  };

  this.goToAdConfig = function (sceneCollection) {
    facebookAdService.save({sceneCollectionId: sceneCollection.id}).then(function (data) {
      $state.go('adConfig', {facebookAdId: data.id});
    });
  };
}

module.exports = stepsNavigator;
