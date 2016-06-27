var templateUrl = require('./targeting_connections.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingConnectionsController,
  bindings: {
    facebookAd: '<',
    adAccountId: '@',
    onUpdate: '&'
  }
};

/* @ngInject */
function TargetingConnectionsController(ezfb) {
  var vm = this;

  vm.$onInit = function () {
    vm.loaded = false;
    vm.saving = false;
    vm.facebookAd = {};
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
        url: 'act_' + vm.adAccountId + '/advertisable_applications',
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
        url: 'act_' + vm.adAccountId  + 'me/promotable_events',
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
    });
  };

  vm.$onChanges = function() {
    extractTargetingSpec();
  };

  vm.searchConnections = searchConnections;
  vm.resetSelectedItems = resetSelectedItems;
  vm.outputConnections = outputConnections;

  function extractTargetingSpec() {
    var keys = ['app_install_state', 'connections', 'excluded_connections', 'friends_of_connections'];
    vm.targetingSpec = vm.facebookAd.targeting;
    vm.connection = _.find(vm.connectionOptions, {name: vm.targetingSpec.connectionName});

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

  function outputConnections() {
    var values = _.map(vm.selectedConnectionItems, function (item) {
      return _.pick(item, ['id', 'name']);
    });

    var results = {connectionName: vm.connection.name};
    results[vm.connectionType.type] = values;

    vm.onUpdate({targetingConnections: results});
  }
}

module.exports = component;
