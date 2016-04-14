var templateUrl = require('./media_library.html');

var component = {
  templateUrl: templateUrl,
  controller: MediaLibraryController,
  bindings: {}
};

function MediaLibraryController(imageService, uploaderService, mediaSelectorService) {
  var vm = this;

  vm.$onInit = function () {
    vm.images = [];
    vm.uploading = false;
    vm.selecting = false;
    mediaSelectorService.onMediaInsert(onMediaInsert);

    fetchImages();
  };

  vm.upload = uploadFiles;
  vm.selectMedia = selectMedia;

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

  function selectMedia(media) {
    vm.selecting = false;
    mediaSelectorService.selectMedia(media);
  }

  function onMediaInsert() {
    vm.selecting = true;
  }
}

module.exports = component;
