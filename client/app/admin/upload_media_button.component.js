var templateUrl = require('./upload_media_button.html');

var component = {
  templateUrl: templateUrl,
  controller: UploadMediaButtonController,
  bindings: {}
};

/*@ngInject*/
function UploadMediaButtonController($window) {
  var vm = this;

  vm.$onInit = function () {
    vm.uploading = false;
  };

  vm.onConvert = onConvert;
  vm.onUpload = onUpload;

  function onConvert() {
    vm.uploading = true;
  }

  function onUpload() {
    vm.uploading = false;
    $window.location.reload();
  }
}

module.exports = component;
