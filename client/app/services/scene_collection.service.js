var uuid = require('node-uuid');

/*@ngInject*/
function sceneCollectionService($resource) {
  var resource = $resource('/scene_collections/:id', {
      id: '@id',
      format: 'json'
    },
    {
      get: {method: 'GET', cache: true},
      update: {method: 'PUT'},
      summaryInfo: {method: 'GET', url: '/scene_collections/:id/summary_info'}
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

  this.summaryInfo = function (params) {
    return resource.summaryInfo(params).$promise;
  };
}

module.exports = sceneCollectionService;
