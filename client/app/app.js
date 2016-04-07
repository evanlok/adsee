// Globally exposed packages
require('jquery');
require('jquery-ujs');
require('lodash');
require('angular');

// select2 and sortablejs are used in Paloma files, otherwise they should be required in the appropriate modules
require('select2');
require('sortablejs');

require('./app.config');

var sceneEditor = require('./scene_editor/scene_editor.module');
var themeSettings = require('./theme_settings/theme_settings.module');

var config = require('./app.config');

angular.module('adsee', [
  require('angular-resource'),
  require('angular-route'),
  sceneEditor,
  themeSettings
]).config(config);
