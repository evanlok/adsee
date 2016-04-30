/*@ngInject*/
function UploadMediaLinkDirective(uploaderService) {
  return {
    restrict: 'A',
    scope: {
      onUpload: '&',
      stockUpload: '@'
    },
    link: link
  };

  function link(scope, element) {
    element.on('click', function (event) {
      event.preventDefault();
      uploadMedia();
    });

    function uploadMedia() {
      uploaderService.uploadFiles(!_.isUndefined(scope.stockUpload)).then(function (dialog, images, videos) {
        scope.onUpload({dialog: dialog, images: images, videos: videos});
      });
    }
  }
}

module.exports = UploadMediaLinkDirective;
