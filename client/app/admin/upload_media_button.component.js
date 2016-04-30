var templateUrl = require('./upload_media_button.html');

var component = {
  templateUrl: templateUrl,
  controller: UploadMediaButtonController,
  bindings: {}
};

/*@ngInject*/
function UploadMediaButtonController($window) {
  var vm = this;

  vm.onUpload = onUpload;

  function onUpload() {
    $window.location.reload();
  }
}

module.exports = component;
