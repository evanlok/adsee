import templateUrl from './audience.html';

class AudienceController {
  /* @ngInject */
  constructor($state, $q, ezfb, profileReportService, facebookAdService) {
    this.$state = $state;
    this.$q = $q;
    this.ezfb = ezfb;
    this.profileReportService = profileReportService;
    this.facebookAdService = facebookAdService;
  }

  $onInit() {
    this.loaded = false;
    this.saving = false;

    this.fetchFacebookAd().then(() => {
      this.loaded = true;
    });
  }

  fetchFacebookAd() {
    return this.facebookAdService.save({sceneCollectionId: this.$state.params.sceneCollectionId}).then(data => {
      this.facebookAd = data;
      this.adAccountId = data.ad_account_id;
    });
  }

  newAudience() {
    this.audienceOption = 'new';
  }

  existingAudience() {
    this.audienceOption = 'existing';
  }

  cancel() {
    this.audienceOption = undefined;
  }

  skip() {
    let state;

    if (this.facebookAd.advanced) {
      state = 'targetingLocations';
    } else {
      state = 'targeting';
    }

    this.$state.go(state);
  }

  saveFacebookAd(adAccountId) {
    return this.facebookAdService.update({id: this.facebookAd.id}, {
      advanced: true,
      ad_account_id: adAccountId
    });
  }

  saveNewAudience($event) {
    this.saving = true;

    let data = $event.profileReport;
    data.scene_collection_id = this.$state.params.sceneCollectionId;
    let profileReportPromise = this.profileReportService.save({}, data);

    this.$q.all([profileReportPromise, this.saveFacebookAd($event.adAccountId)]).then(() => {
      this.sceneCollectionWizard.reloadSceneCollection();
      this.$state.go('targetingLocations');
    }).finally(() => {
      this.saving = false;
    });
  }

  saveExistingAudience($event) {
    this.saving = true;

    let normalizedCustomAudiences = _.map($event.customAudiences, function (item) {
      return _.pick(item, ['id']);
    });

    let targetingSpec = {custom_audiences: normalizedCustomAudiences};
    let facebookAdPromise = this.saveFacebookAd($event.adAccountId);
    let targetingPromise = this.facebookAdService.updateTargetingSpec({id: this.facebookAd.id}, {targeting: targetingSpec});

    this.$q.all([facebookAdPromise, targetingPromise]).then(() => {
      this.sceneCollectionWizard.reloadSceneCollection();
      this.$state.go('targetingLocations');
    }).finally(() => {
      this.saving= false;
    });
  }
}

const component = {
  templateUrl: templateUrl,
  controller: AudienceController,
  bindings: {
    sceneCollection: '<'
  },
  require: {
    sceneCollectionWizard: '^^'
  }
};

export default component;
