import plotlyService from './plotly.service';
import profileReportService from './profile_report.service';
import adAccountService from './ad_account.service';
var services = angular.module('adsee.services', []);

services
  .service('sceneCollectionService', require('./scene_collection.service'))
  .service('sceneContentService', require('./scene_content.service'))
  .service('sceneAttributeService', require('./scene_attribute.service'))
  .service('mediaSelectorService', require('./media_selector.service'))
  .service('imageService', require('./image.service'))
  .service('videoClipService', require('./video_clip.service'))
  .service('videoJobService', require('./video_job.service'))
  .service('facebookAdService', require('./facebook_ad.service'))
  .service('facebookTargetingSpecService', require('./facebook_targeting_spec.service'))
  .service('userService', require('./user.service'))
  .service('iconService', require('./icon.service'))
  .service('fontsService', require('./fonts.service'))
  .service('filterService', require('./filter.service'))
  .service('industryService', require('./industry.service'))
  .service('adTypeService', require('./ad_type.service'))
  .service('themeService', require('./theme.service'))
  .service('profileReportService', profileReportService)
  .service('adAccountService', adAccountService)
  .service('plotlyService', plotlyService);

module.exports = services.name;
