var services = angular.module('adsee.services', []);

services
  .service('sceneCollectionService', require('./scene_collection.service'))
  .service('sceneContentService', require('./scene_content.service'))
  .service('sceneAttributeService', require('./scene_attribute.service'));

module.exports = services.name;
