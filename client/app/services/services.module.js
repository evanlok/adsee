var services = angular.module('adsee.services', []);

services
  .service('sceneCollectionService', require('./scene_collection.service'))
  .service('sceneContentService', require('./scene_content.service'))
  .service('sceneAttributeService', require('./scene_attribute.service'))
  .service('imageService', require('./image.service'))
  .service('videoClipService', require('./video_clip.service'))
  .service('videoJobService', require('./video_job.service'))
  .service('facebookAdService', require('./facebook_ad.service'))
  .service('facebookTargetingSpecService', require('./facebook_targeting_spec.service'))
  .service('userService', require('./user.service'))
  .service('iconService', require('./icon.service'));

module.exports = services.name;
