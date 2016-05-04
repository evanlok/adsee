var layout = angular.module('adsee.layout', []);

layout
  .component('sceneCollectionWizard', require('./scene_collection_wizard.component'))
  .component('wizardBreadcrumbs', require('./wizard_breadcrumbs.component'));

module.exports = layout.name;
