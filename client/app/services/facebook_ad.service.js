var moment = require('moment');

/*@ngInject*/
function FacebookAdService($resource, $http) {
  var resource = $resource('/facebook_ads/:id', {
      id: '@id',
      format: 'json'
    },
    {
      get: {
        transformResponse: appendTransform($http.defaults.transformResponse, parseDates)
      },
      save: {
        method: 'POST',
        url: '/scene_collections/:sceneCollectionId/facebook_ads',
        transformResponse: appendTransform($http.defaults.transformResponse, parseDates)
      },
      update: {
        method: 'PUT',
        transformResponse: appendTransform($http.defaults.transformResponse, parseDates)
      },
      updateTargetingSpec: {
        method: 'PUT',
        url: '/facebook_ads/:id/update_targeting_spec',
        transformResponse: appendTransform($http.defaults.transformResponse, parseDates)
      }
    }
  );

  this.get = function (params) {
    return resource.get(params).$promise;
  };

  this.save = function (params, data) {
    return resource.save(params, data).$promise;
  };

  this.update = function (params, data) {
    return resource.update(params, data).$promise;
  };

  this.updateTargetingSpec = function(params, data) {
    return resource.updateTargetingSpec(params, data).$promise;
  };

  function parseDates(value) {
    if (value.start_time) {
      value.start_time = moment(value.start_time, moment.ISO_8601).toDate();
    }

    if (value.end_time) {
      value.end_time = moment(value.end_time, moment.ISO_8601).toDate();
    }

    return value;
  }

  function appendTransform(defaults, transform) {
    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
  }
}

module.exports = FacebookAdService;
