// CSS
require('./style/app.scss');

var config = require('./app.config');

angular.module('adsee', [
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'color.picker',
  'ng-sortable',
  'bcherny/formatAsCurrency',
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
  require('./summary/summary.module')
]).config(config);
