class ProfileReportService {
  /* @ngInject */
  constructor($resource) {
    this.resource = $resource('/profile_reports/:id',
      {
        id: '@id',
        format: 'json'
      },
      {
        query: {
          method: 'GET',
          isArray: true,
          interceptor: {
            response: function (response) {
              response.resource.$httpHeaders = response.headers;
              return response.resource;
            }
          }
        },
        update: {method: 'PUT'}
      }
    );
  }

  query(params) {
    return this.resource.query(params).$promise;
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
