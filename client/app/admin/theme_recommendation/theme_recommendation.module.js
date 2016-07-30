var themeRecommendation = angular.module('adsee.themeRecommendation', []);

themeRecommendation
  .component('themeRecommendationForm', require('./theme_recommendation_form.component'))
  .service('themeRecommendationService', require('./theme_recommendation.service'));

module.exports = themeRecommendation.name;
