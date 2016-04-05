function sceneCollectionService($resource) {
  var resource = $resource('/scene_collections/:id', {
    id: '@id',
    format: 'json'
  });

  this.get = function (params) {
    return resource.get(params).$promise;
  }
}

module.exports = sceneCollectionService;
