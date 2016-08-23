class ProfileReportService {
  /* @ngInject */
  constructor($resource) {
    this.resource = $resource('/profile_reports/:id',
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

export default ProfileReportService;
