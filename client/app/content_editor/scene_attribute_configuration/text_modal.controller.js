/*@ngInject*/
function TextModalController($scope, $uibModalInstance, fontsService, sceneAttribute) {
  $scope.sceneAttribute = sceneAttribute;
  $scope.config = angular.copy($scope.sceneAttribute.config) || {};
  fetchFonts();

  $scope.editColor = editColor;
  $scope.editBackgroundColor = editBackgroundColor;
  $scope.resetColor = resetColor;
  $scope.resetBackgroundColor = resetBackgroundColor;
  $scope.selectFont = selectFont;
  $scope.resetFont = resetFont;
  $scope.save = save;

  function fetchFonts() {
    fontsService.query().then(function (data) {
      $scope.groupedFonts = _.chunk(data, 3);
    });
  }

  function editColor() {
    $scope.editingColor = true;
  }

  function editBackgroundColor() {
    $scope.editingBackgroundColor = true;
  }

  function resetColor() {
    $scope.editingColor = false;
    delete $scope.config.color;
  }

  function resetBackgroundColor() {
    $scope.editingBackgroundColor = false;
    delete $scope.config.background_color;
  }

  function selectFont(font) {
    $scope.config.font = font.url;
  }

  function resetFont() {
    delete $scope.config.font;
  }

  function save() {
    $uibModalInstance.close($scope.config);
  }
}

module.exports = TextModalController;
