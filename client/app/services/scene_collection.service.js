/*@ngInject*/ function sceneCollectionService($resource) {
  var resource = $resource('/scene_collections/:id', {
      id: '@id',
      format: 'json'
    },
    {
      update: {method: 'PUT'}
    }
  );

  this.get = function (params) {
    return resource.get(params).$promise;
  };
  
  this.update = function (params, data) {
    return resource.update(params, data).$promise;
  };
}

module.exports = sceneCollectionService;
