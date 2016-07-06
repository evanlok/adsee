/*@ngInject*/
function UserService($resource) {
  var resource = $resource('/users/:id',
    {
      id: '@id',
      format: 'json'
    },
    {
      facebook_data: {method: 'GET', url: '/users/facebook_data'},
      facebook_pages: {method: 'GET', url: '/users/facebook_pages', isArray: true}

    }
  );

  this.facebookData = function (params) {
    return resource.facebook_data(params).$promise;
  };

  this.facebookPages = function (params) {
    return resource.facebook_pages(params).$promise;
  };
}

module.exports = UserService;
