/*@ngInject*/
function ThemeRecommendationGroupService($resource) {
  var resource = $resource('/admin/theme_recommendation_groups/:id',
    {
      id: '@id',
      format: 'json'
    },
    {
      availableTargetingSpecs: {method: 'GET', url: '/admin/theme_recommendation_groups/available_targeting_specs', isArray: true}
    }
  );

  this.save = function (params, data) {
    return resource.save(params, data).$promise;
  };

  this.availableTargetingSpecs = function (params) {
    return resource.availableTargetingSpecs(params).$promise;
  };
}

module.exports = ThemeRecommendationGroupService;
