var themeSelector = angular.module('adsee.themeSelector', []);

themeSelector
  .component('themeSelector', require('./theme_selector.component'))
  .component('themeBrowser', require('./theme_browser.component'))
  .component('themeList', require('./theme_list.component'))
  .component('themePreview', require('./theme_preview.component'))
  .directive('outputHeight', require('./output_height.directive'))
  .directive('scrollToThumb', require('./scroll_to_thumb.directive'));

module.exports = themeSelector.name;
