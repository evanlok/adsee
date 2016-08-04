/*@ngInject*/
function ScrollToThumbDirective($timeout, $document) {
  return {
    restrict: 'A',
    scope: false,
    link: link
  };

  function link(scope, element) {
    $timeout(function () {
      var thumbElement = element.parents('.theme-tile');
      $document.scrollTo(thumbElement, 10, 200);
    });
  }
}

module.exports = ScrollToThumbDirective;
