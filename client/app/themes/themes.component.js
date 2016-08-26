import templateUrl from './themes.html';

class ThemesController {
  /* @ngInject */
  constructor($state, themeService, themeVariantService, sceneCollectionService) {
    this.$state = $state;
    this.themeService = themeService;
    this.themeVariantService = themeVariantService;
    this.sceneCollectionService = sceneCollectionService;
  }

  $onInit() {
    this.loading = true;
    this.saving = false;

    if (this.sceneCollection.theme_variant_id) {
      this.fetchThemeVariant();
    } else {
      this.fetchThemes();
    }
  }

  fetchThemes() {
    this.loading = true;
    this.themes = [];
    let promise;

    if (this.sceneCollection.ad_type_id && this.sceneCollection.facebook_targeting_spec_ids[0]) {
      promise = this.fetchThemeRecommendations();
    } else {
      promise = this.fetchThemesForAdType();
    }

    return promise.then(() => {
      this.loading = false;
    });
  }

  fetchThemeRecommendations() {
    this.recommendedThemesAvailable = true;

    return this.themeService.recommended({
      ad_type_id: this.sceneCollection.ad_type_id,
      facebook_targeting_spec_id: this.sceneCollection.facebook_targeting_spec_ids[0]
    }).then(data => {
      this.themeRecommendationGroup = data[0];

      if (this.themeRecommendationGroup) {
        this.themes = this.themeRecommendationGroup.themes;
      }
    }).then(() => {
      if (_.isEmpty(this.themes)) {
        this.fetchThemesForAdType();
      }
    });
  }

  fetchThemesForAdType() {
    this.recommendedThemesAvailable = false;

    return this.themeService.query({ad_type_id: this.sceneCollection.ad_type_id}).then(data => {
      this.themes = data;
    });
  }

  fetchThemeVariant() {
    return this.themeVariantService.get({id: this.sceneCollection.theme_variant_id}).then(data => {
      this.themeVariant = data;
    });
  }

  selectThemeVariant($event) {
    this.saving = true;
    let themeVariant = $event.themeVariant;

    this.sceneCollectionService.update({id: this.sceneCollection.id}, {theme_variant_id: themeVariant.id}).then(() => {
      this.$state.go('sceneEditor');
    }).finally(() => {
      this.saving = false;
    });
  }
}

const component = {
  templateUrl: templateUrl,
  controller: ThemesController,
  bindings: {
    sceneCollection: '<'
  }
};

export default component;
