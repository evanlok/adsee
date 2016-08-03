var themeRecommendationGroup = angular.module('adsee.themeRecommendationGroup', []);

themeRecommendationGroup
  .component('themeRecommendationGroupForm', require('./theme_recommendation_group_form.component'))
  .service('themeRecommendationGroupService', require('./theme_recommendation_group.service'));

module.exports = themeRecommendationGroup.name;
