/*@ngInject*/
function UserService($resource) {
  var resource = $resource('/users/:id', {
      id: '@id',
      format: 'json'
    },
    {
      facebook_data: {method: 'GET', url: '/users/facebook_data'}
    }
  );

  this.facebookData = function (params) {
    return resource.facebook_data(params).$promise;
  };
}

module.exports = UserService;
