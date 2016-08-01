/*@ngInject*/
function ThemeService($resource) {
  var resource = $resource('/themes/:id',
    {
      id: '@id',
      format: 'json'
    },
    {
      query: {method: 'GET', url: '/ad_types/:adTypeId/themes', isArray: true}
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = ThemeService;
