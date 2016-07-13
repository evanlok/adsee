/*@ngInject*/
function FontModalController($scope, currentFont, fontsService) {
  $scope.currentFont = currentFont;

  fontsService.query().then(function (data) {
    $scope.groupedFonts = _.chunk(data, 4);
  });
}

module.exports = FontModalController;
