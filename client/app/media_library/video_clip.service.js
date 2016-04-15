/*@ngInject*/ function VideoClipService($resource) {
  var resource = $resource('/video_clips/:id', {
      id: '@id',
      format: 'json'
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };

  this.save = function (params, data) {
    return resource.save(params, data).$promise;
  };
}

module.exports = VideoClipService;
