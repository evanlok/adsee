var templateUrl = require('./targeting_locations.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingLocationsController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/* @ngInject */
function TargetingLocationsController($state, $q, facebookAdService, ezfb) {
  var vm = this;

  vm.$onInit = function () {
    vm.loaded = false;
    vm.saving = false;
    vm.facebookAd = {};
    vm.locationTypes = 'everyone';
    vm.geofilter = 'include';
    vm.searchQuery = '';
    vm.searchResults = [];
    vm.selectedLocations = [];

    $q.all([ezfb.getLoginStatus(), fetchFacebookAd()]).then(function (results) {
      return initializeSelectedLocations();
    }).then(function () {
      vm.loaded = true;
    });
  };

  vm.searchGeolocations = searchGeolocations;
  vm.formatLocation = formatLocation;
  vm.formatLocationType = formatLocationType;
  vm.selectLocation = selectLocation;
  vm.removeLocation = removeLocation;
  vm.save = save;

  function fetchFacebookAd() {
    return facebookAdService.save({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      vm.facebookAd = data;
    });
  }

  function initializeSelectedLocations() {
    var params = {
      type: 'adgeolocationmeta',
      cities: [],
      regions: [],
      geo_markets: [],
      zips: [],
      countries: [],
      electoral_districts: []
    };

    var locationTypes = ['cities', 'regions', 'geo_markets', 'countries', 'zips', 'electoral_districts'];

    _([vm.facebookAd.targeting.geo_locations, vm.facebookAd.targeting.excluded_geo_locations]).compact().each(function (geoLocations) {
      if (geoLocations.countries) {
        params.countries = params.countries.concat(geoLocations.countries);
      }

      _.each(_.without(locationTypes, 'countries'), function (type) {
        var keys = _.map(geoLocations[type], 'key');
        params[type] = params[type].concat(keys);
      });
    });

    return ezfb.api('/search', params).then(function (data) {
      var locationMetaData = data.data;

      populateLocationData(vm.facebookAd.targeting.geo_locations, true);
      populateLocationData(vm.facebookAd.targeting.excluded_geo_locations, false);

      function populateLocationData(geoLocation, include) {
        _.each(locationTypes, function (type) {
          if (geoLocation[type]) {
            _.each(geoLocation[type], function (savedLocation) {
              var location;

              if (type === 'countries') {
                location = locationMetaData[type][savedLocation]
              } else {
                location = locationMetaData[type][savedLocation.key]
              }

              if (type === 'cities') {
                location.radius = savedLocation.radius;
              }

              location.include = include;

              vm.selectedLocations.push(location);
            });
          }
        });
      }
    });
  }

  function searchGeolocations() {
    if (vm.searchQuery) {
      ezfb.api('/search', {type: 'adgeolocation', q: vm.searchQuery}).then(function (data) {
        vm.searchResults = data.data;
      });
    } else {
      vm.searchResults = [];
    }
  }

  function formatLocation(location) {
    var attrNames = [];

    switch (location.type) {
      case 'city':
        attrNames = ['name', 'region', 'country_name'];
        break;
      case 'region':
        attrNames = ['name', 'country_name'];
        break;
      case 'geo_market':
        attrNames = ['name', 'country_name'];
        break;
      case 'country':
        attrNames = ['name'];
        break;
      case 'zip':
        attrNames = ['name', 'primary_city', 'region', 'country_name'];
        break;
      case 'electoral_district':
        attrNames = ['name', 'region', 'country_name'];
        break;
    }

    var locationString = _(attrNames).map(function (attrName) {
      return location[attrName];
    }).compact().join(', ');

    return locationString;
  }

  function formatLocationType(locationType) {
    var type;

    switch (locationType) {
      case 'city':
        type = 'City';
        break;
      case 'region':
        type = 'State';
        break;
      case 'geo_market':
        type = 'Market';
        break;
      case 'country':
        type = 'Country';
        break;
      case 'zip':
        type = 'Zip/Postal Code';
        break;
      case 'electoral_district':
        type = 'Congressional District';
        break;
    }

    return type;
  }

  function selectLocation(location) {
    if (location.type == 'city') {
      location.radius = 25;
    }

    location.include = vm.geofilter === 'include';
    vm.selectedLocations.push(location);
    vm.searchQuery = '';
    vm.searchResults = [];
  }

  function removeLocation(location) {
    _.pull(vm.selectedLocations, location);
  }

  function buildTargetingSpec() {
    return {
      geo_locations: buildGeolocationSpec(true),
      excluded_geo_locations: buildGeolocationSpec(false)
    }
  }

  function buildGeolocationSpec(include) {
    var typeKeyMapping = {
      city: 'cities',
      region: 'regions',
      geo_market: 'geo_markets',
      country: 'countries',
      zip: 'zips',
      electoral_district: 'electoral_districts'
    };

    var locationOptions = {};
    var locations = _.filter(vm.selectedLocations, {include: include});

    _.each(locations, function (location) {
      var collection = typeKeyMapping[location.type];

      if (!locationOptions[collection]) {
        locationOptions[collection] = [];
      }

      switch (location.type) {
        case 'country':
          locationOptions[collection].push(location.key);
          break;
        case 'city':
          locationOptions[collection].push({key: location.key, radius: location.radius, distance_unit: 'mile'});
          break;
        default:
          locationOptions[collection].push({key: location.key});
      }
    });

    if (include) {
      var locationTypes;

      switch (vm.locationTypes) {
        case 'everyone':
          locationTypes = ['recent', 'home'];
          break;
        default:
          locationTypes = [vm.locationTypes];
      }

      locationOptions.location_types = locationTypes;
    }

    return locationOptions;
  }

  function save() {
    vm.saving = true;
    var requestData = buildTargetingSpec();

    facebookAdService.updateTargetingSpec({id: vm.facebookAd.id}, {targeting: requestData}).then(function (data) {
      // Go to next step

    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
