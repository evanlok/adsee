var templateUrl = require('./media_library.html');

var component = {
  templateUrl: templateUrl,
  controller: MediaLibraryController,
  bindings: {}
};

function MediaLibraryController(imageService, uploaderService) {
  var vm = this;

  vm.$onInit = function () {
    vm.images = [];
    vm.uploading = false;

    fetchImages();
  };

  vm.upload = uploadFiles;

  function fetchImages() {
    imageService.query().then(function (data) {
      vm.images = data;
      vm.groupedImages = _.chunk(vm.images, 3);
    });
  }

  function uploadFiles() {
    vm.uploading = true;

    uploaderService.uploadFiles().then(function (dialog, images) {
    }).finally(function () {
      fetchImages();
      vm.uploading = false;
    });
  }
}

module.exports = component;
