var modalCtrl = require('./new_scene_collection_modal.controller');
var modalTemplateUrl = require('./new_scene_collection_modal.html');

/*@ngInject*/
function NewSceneCollectionLinkDirective($uibModal) {
  return {
    restrict: 'A',
    scope: {
      adTypeId: '@',
      themeId: '@'
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
        templateUrl: modalTemplateUrl,
        resolve: {
          adTypeId: function () {
            return scope.adTypeId;
          },
          themeId: function () {
            return scope.themeId;
          }
        }
      });
    }
  }
}

module.exports = NewSceneCollectionLinkDirective;
