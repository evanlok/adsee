/*@ngInject*/
function ThemeService($resource) {
  var resource = $resource('/themes/:id',
    {
      id: '@id',
      format: 'json'
    },
    {
      recommended: {method: 'GET', url: '/theme_recommendation_groups', isArray: true}
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };

  this.recommended = function (params) {
    return resource.recommended(params).$promise;
  };
}

module.exports = ThemeService;
