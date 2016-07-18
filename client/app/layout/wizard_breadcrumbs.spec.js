require('./layout.module');

describe('component: wizardBreadcrumbs', function () {
  var $componentController, ctrl, bindings, $state, videoJobService, facebookAdService;

  beforeEach(angular.mock.module('adsee.layout'));
  beforeEach(angular.mock.inject(function (_$componentController_) {
    $componentController = _$componentController_;
    $state = jasmine.createSpyObj('$state', ['go']);
    videoJobService = jasmine.createSpyObj('videoJobService', ['query']);
    facebookAdService = jasmine.createSpyObj('facebookAdService', ['save']);
  }));

  function initializeController() {
    var locals = {$state: $state, videoJobService: videoJobService, facebookAdService: facebookAdService};
    ctrl = $componentController('wizardBreadcrumbs', locals, bindings);
  }

  describe('.goToTargeting', function () {
    describe('for advanced targeting', function () {
      it('navigates to targetingLocations', function () {
        bindings = {sceneCollection: {advanced_targeting: true}};
        initializeController();
        ctrl.goToTargeting();
        expect($state.go).toHaveBeenCalledWith('targetingLocations');
      });
    });

    describe('for basic targeting', function () {
      it('navigates to targeting', function () {
        bindings = {sceneCollection: {advanced_targeting: false}};
        initializeController();
        ctrl.goToTargeting();
        expect($state.go).toHaveBeenCalledWith('targeting');
      });
    });
  });
});
