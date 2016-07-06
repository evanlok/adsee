/*@ngInject*/
function FacebookTargetingSpecService($resource) {
  var resource = $resource('/facebook_targeting_specs/:id',
    {
      id: '@id',
      format: 'json'
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = FacebookTargetingSpecService;
