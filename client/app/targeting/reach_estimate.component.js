var templateUrl = require('./reach_estimate.html');

var component = {
  templateUrl: templateUrl,
  controller: ReachEstimateController,
  bindings: {
    targetingSpec: '<',
    adAccountId: '@'
  }
};

/* @ngInject */
function ReachEstimateController($scope, ezfb) {
  var vm = this;
  var objectKeys = ['interests', 'behaviors', 'life_events', 'politics', 'industries', 'income', 'net_worth', 'home_type',
    'home_ownership', 'ethnic_affinity', 'generation', 'household_composition', 'moms', 'family_statuses', 'office_type',
    'education_schools', 'education_majors', 'work_employers', 'work_positions', 'connections', 'excluded_connections'];

  var valueKeys = ['relationship_statuses', 'interested_in', 'education_statuses', 'college_years'];

  vm.$onInit = function () {
    vm.loaded = false;

    ezfb.getLoginStatus().then(function () {
      vm.loaded = true;
      fetchReachEstimate();
    });

    $scope.$watch(function () {
      return vm.targetingSpec;
    }, function () {
      fetchReachEstimate();
    }, true);
  };

  vm.$onChanges = function () {
    fetchReachEstimate();
  };

  function fetchReachEstimate() {
    if (!vm.adAccountId || !vm.loaded) {
      return;
    }

    var params = {
      targeting_spec: normalizedTargetingSpec(),
      optimize_for: 'VIDEO_VIEWS'
    };

    ezfb.api(vm.adAccountId + '/reachestimate', params).then(function (data) {
      vm.reachEstimate = data.data;
    });
  }

  function normalizedTargetingSpec() {
    var normalizedTargetingSpec = _.cloneDeep(vm.targetingSpec);

    _.each(normalizedTargetingSpec, function (value, key) {
      if (_.includes(objectKeys, key)) {
        normalizedTargetingSpec[key] = _.pick(value, 'id');
      } else if (_.includes(valueKeys, key)) {
        normalizedTargetingSpec[key] = _.map(value, 'id');
      }
    });

    return normalizedTargetingSpec;
  }
}

module.exports = component;
