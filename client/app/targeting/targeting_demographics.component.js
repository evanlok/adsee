var templateUrl = require('./targeting_demographics.html');

var component = {
  templateUrl: templateUrl,
  controller: TargetingDemographicsController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/* @ngInject */
function TargetingDemographicsController($state, $q, facebookAdService, ezfb) {
  var vm = this;

  var audienceTypes = {
    interests: 'Interests',
    behaviors: 'Behaviors',
    relationship_statuses: 'Relationship Status',
    interested_in: 'Interested In',
    life_events: 'Life Event',
    politics: 'Politics',
    industries: 'Industry',
    income: 'Income',
    net_worth: 'Net Worth',
    home_type: 'Home Type',
    home_ownership: 'Home Ownership',
    ethnic_affinity: 'Ethnicity',
    generation: 'Generation',
    household_composition: 'Household Composition',
    moms: 'Moms',
    family_statuses: 'Family Status',
    office_type: 'Office Type',
    education_schools: 'Schools',
    education_statuses: 'Education Level',
    college_years: 'College Years',
    education_majors: 'Majors',
    work_employers: 'Employers',
    work_positions: 'Job Titles'
  };

  vm.$onInit = function () {
    vm.loaded = false;
    vm.saving = false;
    vm.facebookAd = {};
    vm.targetingSpec = {};
    vm.ageOptions = _.range(13, 66);
    vm.localeSearchQuery = '';
    vm.locales = [];
    vm.selectedLocales = [];
    vm.detailedTargetingQuery = '';
    vm.detailedTargetingResults = [];
    vm.audienceTypes = audienceTypes;
    vm.baseCategories = ['Demographics', 'Interests', 'Behaviors', 'More Categories'];
    vm.browseItems = [];
    vm.browseTree = [];
    vm.treeOptions = {
      dirSelectable: false
    };

    $q.all([ezfb.getLoginStatus(), fetchFacebookAd()]).then(function (results) {
      fetchLocales();
      return fetchAdAccounts();
    }).then(function () {
      fetchTargetingBrowse();
      vm.loaded = true;
    });
  };

  vm.setGender = setGender;
  vm.genderActive = genderActive;
  vm.selectLocale = selectLocale;
  vm.removeLocale = removeLocale;
  vm.findLocaleByKey = findLocaleByKey;
  vm.searchDetailedTargeting = searchDetailedTargeting;
  vm.titleize = titleize;
  vm.selectAudience = selectAudience;
  vm.removeAudience = removeAudience;
  vm.chooseNode = chooseNode;
  vm.updateTargetingConnections = updateTargetingConnections;
  vm.save = save;

  function fetchFacebookAd() {
    return facebookAdService.save({sceneCollectionId: vm.sceneCollectionId}).then(function (data) {
      vm.facebookAd = data;
      vm.targetingSpec = vm.facebookAd.targeting;

      if (!vm.targetingSpec.age_min) {
        vm.targetingSpec.age_min = 13;
      }

      if (!vm.targetingSpec.age_max) {
        vm.targetingSpec.age_max = 65;
      }
    });
  }

  function fetchLocales() {
    return ezfb.api('/search', {type: 'adlocale'}).then(function (data) {
      vm.locales = data.data;
    });
  }

  function fetchTargetingBrowse() {
    return ezfb.api('/act_' + vm.adAccounts[0].account_id + '/targetingbrowse').then(function (data) {
      vm.browseItems = data.data;
      buildBrowseTree();
    });
  }

  function buildBrowseTree() {
    var tree = _.map(vm.baseCategories, function (item) {
      return {name: item, children: []};
    });

    var current = tree;

    _.each(vm.browseItems, function (item) {
      _.each(item.path, function (pathName) {
        var match = _.find(current, {name: pathName});

        if (!match) {
          match = {name: pathName, children: []};
          current.push(match);
        }

        current = match.children;
      });

      current.push(item);
      current = tree;
    });

    vm.browseTree = tree;
  }

  function fetchAdAccounts() {
    return ezfb.api('/me/adaccounts').then(function (data) {
      vm.adAccounts = data.data;
    });
  }

  function searchDetailedTargeting() {
    if (vm.detailedTargetingQuery) {
      ezfb.api('/act_' + vm.adAccounts[0].account_id + '/targetingsearch', {q: vm.detailedTargetingQuery}).then(function (data) {
        vm.detailedTargetingResults = data.data;
      });
    } else {
      vm.detailedTargetingResults = [];
    }
  }

  function setGender(gender) {
    if (gender !== 0) {
      vm.targetingSpec.genders = [gender]
    } else {
      delete vm.targetingSpec.genders;
    }
  }

  function genderActive(gender) {
    if (gender === 0) {
      return !vm.targetingSpec.genders;
    } else {
      return _.includes(vm.targetingSpec.genders, gender)
    }
  }

  function selectLocale(locale) {
    if (!vm.targetingSpec.locales) {
      vm.targetingSpec.locales = [];
    }

    vm.targetingSpec.locales.push(locale.key);
    vm.localeSearchQuery = '';
  }

  function removeLocale(locale) {
    _.pull(vm.targetingSpec.locales, locale.key);
  }

  function findLocaleByKey(key) {
    return _.find(vm.locales, {key: key});
  }

  function titleize(type) {
    return audienceTypes[type] || _.startCase(type);
  }

  function selectAudience(audience) {
    var type = audience.type;

    if (!vm.targetingSpec[type]) {
      vm.targetingSpec[type] = [];
    }

    vm.targetingSpec[type].push(audience);

    vm.detailedTargetingQuery = '';
    vm.detailedTargetingResults = [];
  }

  function removeAudience(type, id) {
    _.remove(vm.targetingSpec[type], {id: id});
  }

  function chooseNode(node) {
    vm.browsing = false;
    selectAudience(node);
  }

  function updateTargetingConnections(targetingConnections) {
    _.each(['app_install_state', 'connections', 'excluded_connections', 'friends_of_connections'], function (key) {
      delete vm.targetingSpec[key];
    });

    _.assign(vm.targetingSpec, targetingConnections);
  }

  function save() {
    vm.saving = true;

    facebookAdService.updateTargetingSpec({id: vm.facebookAd.id}, {targeting: vm.targetingSpec}).then(function (data) {
      $state.go('sceneEditor');
    }).finally(function () {
      vm.saving = false;
    });
  }
}

module.exports = component;
