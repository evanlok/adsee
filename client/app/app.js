// CSS
require('./../style/app.scss');

var config = require('./app.config');

angular.module('adsee', [
  'ngResource',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'treeControl',
  'color.picker',
  'ng-sortable',
  'duScroll',
  'timer',
  'ui.bootstrap.showErrors',
  'bcherny/formatAsCurrency',
  'ezfb',
  'rzModule',
  'xeditable',
  require('./admin/admin.module'),
  require('./shared/shared.module'),
  require('./layout/layout.module'),
  require('./targeting/targeting.module'),
  require('./scene_editor/scene_editor.module'),
  require('./theme_settings/theme_settings.module'),
  require('./content_editor/content_editor.module'),
  require('./scene_list/scene_list.module'),
  require('./scene_navigator/scene_navigator.module'),
  require('./add_scene/add_scene.module'),
  require('./media_library/media_library.module'),
  require('./services/services.module'),
  require('./preview/preview.module'),
  require('./ad_config/ad_config.module'),
  require('./summary/summary.module'),
  require('./media/media.module'),
  require('./scene_collection/scene_collection.module'),
  require('./facebook_post_config/facebook_post_config.module'),
  require('./navigation/navigation.module'),
  require('./smart_create/smart_create.module'),
  require('./theme_selector/theme_selector.module')
]).config(config).run(/*@ngInject*/ function (editableOptions) {
  editableOptions.theme = 'bs3';
});

require('./constants');
