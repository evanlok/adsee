import emailUploaderForm from './email_uploader_form.component';
import audienceComponent from './audience.component';
import existingAudienceForm from './existing_audience_form.component';
const audience = angular.module('adsee.audience', []);

audience
  .component('audience', audienceComponent)
  .component('existingAudienceForm', existingAudienceForm)
  .component('emailUploaderForm', emailUploaderForm);

export default audience.name;
