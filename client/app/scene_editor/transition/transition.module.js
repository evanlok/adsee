var transition = angular.module('adsee.transition', []);

transition
  .component('transitionConfig', require('./transition_config.component'))
  .service('transitionsService', require('./transitions.service.js'));

module.exports = transition.name;
