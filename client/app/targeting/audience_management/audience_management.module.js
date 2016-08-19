import customAudienceService from './custom_audience.service';
const audienceManagement = angular.module('adsee.audienceManagement', []);

audienceManagement
  .component('customAudience', require('./custom_audience.component'))
  .service('customAudienceService', customAudienceService);

export default audienceManagement.name;
