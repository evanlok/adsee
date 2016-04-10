function sceneContentService($resource) {
  var resource = $resource('/scene_contents/:id', {
      id: '@id',
      format: 'json'
    },
    {
      query: {method: 'GET', url: '/scene_collections/:sceneCollectionId/scene_contents', isArray: true},
      save: {method: 'POST', url: '/scene_collections/:sceneCollectionId/scene_contents'},
      update: {method: 'PUT'}
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };

  this.save = function (params) {
    return resource.save(params).$promise;
  };

  this.get = function (params) {
    return resource.get(params).$promise;
  };

  this.update = function (params, data) {
    return resource.update(params, data).$promise;
  };
}

module.exports = sceneContentService;
