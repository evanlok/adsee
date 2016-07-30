/*@ngInject*/
function IndustryService($resource) {
  var resource = $resource('/industries/:id',
    {
      id: '@id',
      format: 'json'
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = IndustryService;
