class ThemeVariantService {
  /*@ngInject*/
  constructor($resource) {
    this.resource = $resource('/theme_variants/:id',
      {
        id: '@id',
        format: 'json'
      }
    );
  }

  get(params) {
    return this.resource.get(params).$promise;
  }
}

export default ThemeVariantService;
