/*@ngInject*/
function IconService($resource) {
  var resource = $resource('/icons/:id', {
      id: '@id',
      format: 'json'
    },
    {
      query: {
        method: 'GET',
        isArray: true,
        interceptor: {
          response: function (response) {
            response.resource.$httpHeaders = response.headers;
            return response.resource;
          }
        }
      }
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = IconService;
