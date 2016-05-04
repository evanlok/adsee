var templateUrl = require('./scene_collection_wizard.html');

var component = {
  templateUrl: templateUrl,
  controller: SceneCollectionWizardController,
  bindings: {
    sceneCollectionId: '@'
  }
};

/*@ngInject*/
function SceneCollectionWizardController() {
}

module.exports = component;
