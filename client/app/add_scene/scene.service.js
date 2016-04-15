/*@ngInject*/ function SceneService($resource) {
  var resource = $resource('/scenes/:id', {
      id: '@id',
      format: 'json'
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = SceneService;
