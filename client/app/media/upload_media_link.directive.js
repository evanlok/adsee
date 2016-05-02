/*@ngInject*/
function UploadMediaLinkDirective(uploaderService) {
  return {
    restrict: 'A',
    scope: {
      onUpload: '&',
      onConvertStart: '&',
      stockUpload: '@'
    },
    link: link
  };

  function link(scope, element) {
    var onConvertStartCallback = function () {
      scope.onConvertStart();
    };

    element.on('click', function (event) {
      event.preventDefault();
      uploadMedia();
    });

    element.on('$destroy', function () {
      uploaderService.removeOnConvertStart(onConvertStartCallback);
    });

    uploaderService.onConvertStart(onConvertStartCallback);

    function uploadMedia() {
      uploaderService.uploadFiles(!_.isUndefined(scope.stockUpload)).then(function (dialog, images, videos) {
        scope.onUpload({dialog: dialog, images: images, videos: videos});
      });
    }
  }
}

module.exports = UploadMediaLinkDirective;
