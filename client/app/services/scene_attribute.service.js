/*@ngInject*/
function sceneAttributeService($resource) {
  var resource = $resource('/scene_attributes/:id',
    {
      id: '@id',
      format: 'json'
    },
    {
      save: {method: 'POST', url: '/scene_contents/:sceneContentId/scene_attributes'},
      update: {method: 'PUT'}
    }
  );

  this.save = function (params, data) {
    return resource.save(params, data).$promise;
  };

  this.update = function (params, data) {
    return resource.update(params, data).$promise;
  };
}

module.exports = sceneAttributeService;
