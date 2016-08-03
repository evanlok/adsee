var themeSelector = angular.module('adsee.themeSelector', []);

themeSelector
  .component('themeSelector', require('./theme_selector.component'))
  .component('themeBrowser', require('./theme_browser.component'));


module.exports = themeSelector.name;
