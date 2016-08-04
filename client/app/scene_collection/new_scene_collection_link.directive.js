var modalCtrl = require('./new_scene_collection_modal.controller');
var modalTemplateUrl = require('./new_scene_collection_modal.html');

/*@ngInject*/
function NewSceneCollectionLinkDirective($uibModal) {
  return {
    restrict: 'A',
    scope: {
      themeId: '@',
      targetingSpecId: '@',
      skipAspectRatio: '=?'
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
        controller: modalCtrl,
        size: 'lg',
        templateUrl: modalTemplateUrl,
        resolve: {
          themeId: function () {
            return scope.themeId;
          },
          skipAspectRatio: function () {
            return scope.skipAspectRatio;
          },
          targetingSpecId: function () {
            return scope.targetingSpecId;
          }
        }
      });
    }
  }
}

module.exports = NewSceneCollectionLinkDirective;
