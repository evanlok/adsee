import templateUrl from './existing_audience_form.html';

class ExistingAudienceFormController {
  /* @ngInject */
  constructor(adAccountService, customAudienceService) {
    this.adAccountService = adAccountService;
    this.customAudienceService = customAudienceService;
  }

  $onInit() {
    this.selectedCustomAudiences = [];
    this.fetchAdAccounts();
    this.fetchCustomAudiences();
  }

  fetchAdAccounts() {
    return this.adAccountService.query().then(data => {
      this.adAccounts = data.data;
    });
  }

  fetchCustomAudiences() {
    return this.customAudienceService.query(this.adAccountId).then(data => {
      this.customAudiences = data.data;
      this.selectedCustomAudiences = _.intersectionBy(this.customAudiences, this.existingCustomAudiences, 'id');
    });
  }

  formatAdAccount(adAccount) {
    return this.adAccountService.formatAdAccount(adAccount);
  }

  adAccountChanged() {
    this.selectedCustomAudiences = [];
  }

  save() {
    let payload = {
      customAudiences: this.selectedCustomAudiences,
      adAccountId: this.adAccountId
    };

    this.onSave({$event: payload});
  }
}

const component = {
  templateUrl: templateUrl,
  controller: ExistingAudienceFormController,
  bindings: {
    adAccountId: '@',
    existingCustomAudiences: '<',
    saving: '<',
    onSave: '&',
    onCancel: '&'
  }
};

export default component;
