var navigation = angular.module('adsee.navigation', []);

navigation
  .service('stepsNavigator', require('./steps_navigator.service'));

module.exports = navigation.name;
