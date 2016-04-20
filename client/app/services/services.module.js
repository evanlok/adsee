var services = angular.module('adsee.services', []);

services
  .service('sceneCollectionService', require('./scene_collection.service'))
  .service('sceneContentService', require('./scene_content.service'))
  .service('sceneAttributeService', require('./scene_attribute.service'))
  .service('mediaSelectorService', require('./media_selector.service'))
  .service('videoJobService', require('./video_job.service'));

module.exports = services.name;
