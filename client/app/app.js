// CSS
require('./style/app.scss');

var config = require('./app.config');

angular.module('adsee', [
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'color.picker',
  'ng-sortable',
  'bcherny/formatAsCurrency',
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
  require('./media/media.module')
]).config(config)
  .run(function /*@ngInject*/($rootScope, $window, $state, SSL_ENABLED) {
    // Redirect preview to non-ssl url so that streaming works correctly
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      if (SSL_ENABLED) {
        var hostWithPort = $window.location.hostname + ($window.location.port ? ':' + $window.location.port : '');
        var path = $state.href(toState.name, toParams);

        if (toState.name === 'preview') {
          if ($window.location.protocol !== 'http:') {
            $window.location = 'http://' + hostWithPort + path;
          }
        } else if ($window.location.protocol !== 'https:') {
          $window.location = 'https://' + hostWithPort + path;
        }
      }
    });
});

require('./constants');
