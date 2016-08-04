/*@ngInject*/
function OutputHeightDirective($timeout) {
  return {
    restrict: 'A',
    scope: {
      onOutputHeight: '&'
    },
    link: link
  };

  function link(scope, element) {
    $timeout(function () {
      var height = element[0].offsetHeight;
      scope.onOutputHeight({height: height});
    });
  }
}

module.exports = OutputHeightDirective;
