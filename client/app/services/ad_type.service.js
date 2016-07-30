/*@ngInject*/
function AdTypeService($resource) {
  var resource = $resource('/industries/:industryId/ad_types/:id',
    {
      id: '@id',
      format: 'json'
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = AdTypeService;
