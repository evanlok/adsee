function ngFileInputDirective() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: link
  };

  function link(scope, element, attrs, ngModel) {
    var fileTypeRegex = /^file$/i;

    if (ngModel && element[0].tagName === 'INPUT' && fileTypeRegex.test(attrs['type'])) {
      element.on('change', function () {
        var input = this;

        if ('multiple' in attrs) {
          var files = Array.prototype.map.call(input.files, function (file) {
            return file;
          });
          ngModel.$setViewValue(files);
        }
        else {
          ngModel.$setViewValue(input.files[0]);
        }
      });
    }
  }
}

module.exports = ngFileInputDirective;
