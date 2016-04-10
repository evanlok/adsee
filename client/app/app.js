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
require('sortablejs');

var config = require('./app.config');

angular.module('adsee', [
  require('angular-resource'),
  require('angular-route'),
  require('angularjs-color-picker/dist/angularjs-color-picker'),
  require('./scene_editor/scene_editor.module'),
  require('./theme_settings/theme_settings.module'),
  require('./content_editor/content_editor.module'),
  require('./scene_list/scene_list.module'),
  require('./services/services.module')
]).config(config);
