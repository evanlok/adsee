/*@ngInject*/ function VideoClipService($resource) {
  var resource = $resource('/video_clips/:id', {
      id: '@id',
      format: 'json'
    },
    {
      saveStock: {method: 'POST', url: '/admin/video_clips'}
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };

  this.save = function (params, data) {
    return resource.save(params, data).$promise;
  };

  this.saveStock = function (params, data) {
    return resource.saveStock(params, data).$promise;
  };
}

module.exports = VideoClipService;