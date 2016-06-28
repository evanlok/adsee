var templateUrl = require('./targeting_connections.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingConnectionsController,
  bindings: {
    facebookAd: '<',
    adAccountId: '@'
  },
  require: {
    targetingDemographics: '^^'
  }
};

/* @ngInject */
function TargetingConnectionsController(ezfb) {
  var vm = this;
  var connectionSpecKeys = ['app_install_state', 'connections', 'excluded_connections', 'friends_of_connections', 'connection_name'];

  vm.$onInit = function () {
    vm.loaded = false;
    vm.saving = false;
    vm.targetingSpec = {};
    vm.connection = undefined;
    vm.connectionType = undefined;
    vm.connectionItems = [];
    vm.selectedConnectionItems = [];
    vm.connectionOptions = [
      {
        name: 'Facebook Pages',
        url: 'me/accounts',
        options: [
          {
            name: 'People who like your Page',
            type: 'connections'
          },
          {
            name: 'Friends of people who like your Page',
            type: 'friends_of_connections'
          },
          {
            name: 'Exclude people who like your Page',
            type: 'excluded_connections'
          }
        ]
      },
      {
        name: 'Apps',
        url: vm.adAccountId + '/advertisable_applications',
        options: [
          {
            name: 'People who used your app',
            type: 'connections'
          },
          {
            name: 'Friends of people who used your app',
            type: 'friends_of_connections'
          },
          {
            name: 'Exclude people who used your app',
            type: 'excluded_connections'
          }
        ]
      },
      {
        name: 'Events',
        url: vm.adAccountId + 'me/promotable_events',
        options: [
          {
            name: 'People who responded to your event',
            type: 'connections'
          },
          {
            name: 'Friends of people who responded to your event',
            type: 'friends_of_connections'
          },
          {
            name: 'Exclude people who already responded to your event',
            type: 'excluded_connections'
          }
        ]
      }
    ];

    ezfb.getLoginStatus().then(function () {
      vm.loaded = true;
      extractTargetingSpec();
    });
  };

  vm.$onChanges = function () {
    extractTargetingSpec();
  };

  vm.searchConnections = searchConnections;
  vm.resetSelectedItems = resetSelectedItems;
  vm.updateConnections = updateConnections;
  vm.remove = remove;

  function extractTargetingSpec() {
    var keys = ['app_install_state', 'connections', 'excluded_connections', 'friends_of_connections'];
    vm.targetingSpec = vm.facebookAd.targeting;
    vm.connection = _.find(vm.connectionOptions, {name: vm.targetingSpec.connection_name});

    if (vm.connection) {
      searchConnections();

      var type = _.intersection(_.keys(vm.targetingSpec), keys)[0];
      vm.connectionType = _.find(vm.connection.options, {type: type});
      vm.selectedConnectionItems = vm.targetingSpec[type];
    }
  }

  function searchConnections() {
    resetSelectedItems();

    return ezfb.api(vm.connection.url).then(function (data) {
      vm.connectionItems = data.data;
    });
  }

  function resetSelectedItems() {
    vm.selectedConnectionItems = [];
  }

  function updateConnections() {
    var values = _.map(vm.selectedConnectionItems, function (item) {
      return _.pick(item, ['id', 'name']);
    });

    var connectionSpec = {connection_name: vm.connection.name};
    connectionSpec[vm.connectionType.type] = values;

    resetTargetingSpecKeys();
    _.assign(vm.targetingDemographics.targetingSpec, connectionSpec);
  }

  function remove() {
    resetSelectedItems();
    resetTargetingSpecKeys();
    vm.connection = null;
    vm.connectionType = null;
  }

  function resetTargetingSpecKeys() {
    _.each(connectionSpecKeys, function (key) {
      delete vm.targetingDemographics.targetingSpec[key];
    });
  }
}

module.exports = component;
