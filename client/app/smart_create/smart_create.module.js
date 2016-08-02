var smartCreate = angular.module('adsee.smartCreate', []);

smartCreate
  .component('smartCreate', require('./smart_create.component'));


module.exports = smartCreate.name;
