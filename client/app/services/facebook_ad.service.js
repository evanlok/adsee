/*@ngInject*/
function FacebookAdService($resource) {
  var resource = $resource('/facebook_ads/:id', {
      id: '@id',
      format: 'json'
    },
    {
      save: {method: 'POST', url: '/scene_collections/:sceneCollectionId/facebook_ads'},
      update: {method: 'PUT'}
    }
  );

  this.get = function (params) {
    return resource.get(params).$promise;
  };

  this.save = function (params, data) {
    return resource.save(params, data).$promise;
  };

  this.update = function (params, data) {
    return resource.update(params, data).$promise;
  };
}

module.exports = FacebookAdService;
