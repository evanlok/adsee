/*@ngInject*/
function filterService($resource) {
  var resource = $resource('/filters/:id',
    {
      id: '@id',
      format: 'json'
    },
    {
      query: {method: 'GET', cache: true, isArray: true}
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = filterService;
