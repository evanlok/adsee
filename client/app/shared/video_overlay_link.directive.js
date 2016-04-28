var modalCtrl = require('./video_overlay_link_modal.controller');
var modalTemplateUrl = require('./video_overlay_link_modal.html');

/*@ngInject*/
function VideoOverlayLinkDirective($uibModal) {
  return {
    restrict: 'A',
    scope: {
      videoOverlayLink: '@',
      poster: '@',
      autoplay: '@'
    },
    link: link
  };

  function link(scope, element) {
    element.on('click', function (event) {
      event.preventDefault();
      openModal();
    });

    function openModal() {
      return $uibModal.open({
        size: 'lg',
        controller: modalCtrl,
        templateUrl: modalTemplateUrl,
        scope: scope,
        resolve: {
          url: function () {
            return scope.videoOverlayLink;
          },
          poster: function () {
            return scope.poster;
          },
          autoplay: function () {
            return scope.autoplay;
          }
        }
      });
    }
  }
}

module.exports = VideoOverlayLinkDirective;
