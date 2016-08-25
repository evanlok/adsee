class ProfileReportService {
  /* @ngInject */
  constructor($resource) {
    this.resource = $resource('/profile_reports/:id',
      {
        id: '@id',
        format: 'json'
      },
      {
        update: {method: 'PUT'}
      }
    );
  }

  get(params) {
    return this.resource.get(params).$promise;
  }

  save(params, data) {
    return this.resource.save(params, data).$promise;
  }

  update(params, data) {
    return this.resource.update(params, data).$promise;
  }
}

export default ProfileReportService;
