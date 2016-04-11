// CSS
require('./style/app.scss');

// Globally exposed packages
require('jquery');
require('jquery-ujs');
require('lodash');
require('angular');
require('tinycolor2');

// select2 and sortablejs are used in Paloma files, otherwise they should be required in the appropriate modules
require('select2');
require('sortablejs/ng-sortable');

var config = require('./app.config');

angular.module('adsee', [
  require('angular-resource'),
  require('angularjs-color-picker/dist/angularjs-color-picker'),
  require('angular-ui-router'),
  'ng-sortable',
  require('./scene_editor/scene_editor.module'),
  require('./theme_settings/theme_settings.module'),
  require('./content_editor/content_editor.module'),
  require('./scene_list/scene_list.module'),
  require('./scene_navigator/scene_navigator.module'),
  require('./add_scene/add_scene.module'),
  require('./services/services.module')
]).config(config);
