import templateUrl from './facebook_integration_types.html';

class FacebookIntegrationTypesController {
  selectIntegration(type) {
    this.onSelect({$event: {type: type}});
  }
}

const component = {
  templateUrl: templateUrl,
  controller: FacebookIntegrationTypesController,
  bindings: {
    onSelect: '&'
  }
};

export default component;
