/*@ngInject*/
function IconService($resource) {
  var resource = $resource('/icons/:id', {
      id: '@id',
      format: 'json'
    }
  );

  this.query = function (params) {
    return resource.query(params).$promise;
  };
}

module.exports = IconService;
