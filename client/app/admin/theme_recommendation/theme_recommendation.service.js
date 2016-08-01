/*@ngInject*/
function ThemeRecommendationService($resource) {
  var resource = $resource('/admin/theme_recommendations/:id',
    {
      id: '@id',
      format: 'json'
    },
    {
      availableThemes: {method: 'GET', url: '/admin/theme_recommendations/available_themes', isArray: true}
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };

  this.get = function (params) {
    return resource.get(params).$promise;
  };

  this.save = function (params, data) {
    return resource.save(params, data).$promise;
  };

  this.update = function (params, data) {
    return resource.update(params, data).$promise;
  };

  this.delete = function (params, data) {
    return resource.delete(params, data).$promise;
  };

  this.availableThemes = function (params) {
    return resource.availableThemes(params).$promise;
  };
}

module.exports = ThemeRecommendationService;
