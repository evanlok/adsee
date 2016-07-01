/*@ngInject*/
function FontModalController($scope, currentFont, fontsService) {
  $scope.currentFont = currentFont;
  $scope.groupedFonts = _.chunk(fontsService.get(), 4);
}

module.exports = FontModalController;
