/*@ngInject*/
function VideoJobService($resource) {
  var resource = $resource('/video_jobs/:id', {
      id: '@id',
      format: 'json'
    },
    {
      preview: {method: 'POST', url: '/scene_collections/:sceneCollectionId/video_jobs/preview'},
      generate: {method: 'POST', url: '/scene_collections/:sceneCollectionId/video_jobs/generate'}
    }
  );

  this.get = function (params) {
    return resource.get(params).$promise;
  };

  this.preview = function (params, data) {
    return resource.preview(params, data).$promise;
  };

  this.generate = function (params, data) {
    return resource.generate(params, data).$promise;
  };
}

module.exports = VideoJobService;
