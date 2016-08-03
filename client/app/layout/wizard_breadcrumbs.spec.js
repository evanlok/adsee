require('./layout.module');

describe('component: wizardBreadcrumbs', function () {
  var $componentController, ctrl, bindings, $state, stepsNavigator;

  beforeEach(angular.mock.module('adsee.layout'));
  beforeEach(angular.mock.inject(function (_$componentController_) {
    $componentController = _$componentController_;
    $state = jasmine.createSpyObj('$state', ['go']);
    stepsNavigator = jasmine.createSpyObj('stepsNavigator', ['goToTargeting']);
  }));

  function initializeController() {
    var locals = {
      $state: $state,
      stepsNavigator: stepsNavigator
    };
    ctrl = $componentController('wizardBreadcrumbs', locals, bindings);
  }

  describe('.goToTargeting', function () {
    it('navigates to targetingLocations', function () {
      bindings = {sceneCollection: {advanced_targeting: true}};
      initializeController();
      ctrl.goToTargeting();
      expect(stepsNavigator.goToTargeting).toHaveBeenCalledWith(bindings.sceneCollection);
    });
  });
});
