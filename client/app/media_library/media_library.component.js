var templateUrl = require('./media_library.html');

var component = {
  templateUrl: templateUrl,
  controller: MediaLibraryController,
  bindings: {}
};

/*@ngInject*/
function MediaLibraryController(imageService, videoClipService, mediaSelectorService) {
  var vm = this;

  vm.$onInit = function () {
    vm.images = [];
    vm.videos = [];
    vm.uploading = false;
    vm.selecting = false;
    vm.display = {images: true, videos: false};
    mediaSelectorService.onMediaInsert(onMediaInsert);

    fetchImages();
    fetchVideoClips();
  };

  vm.onConvert = onConvert;
  vm.onUpload = onUpload;
  vm.selectMedia = selectMedia;
  vm.fetchImages = fetchImages;
  vm.fetchVideoClips = fetchVideoClips;
  vm.showImages = showImages;
  vm.showVideos = showVideos;

  function fetchImages() {
    imageService.query().then(function (data) {
      vm.images = data;
      vm.groupedImages = _.chunk(vm.images, 3);
    });
  }

  function fetchVideoClips() {
    videoClipService.query().then(function (data) {
      vm.videos = data;
      vm.groupedVideos = _.chunk(vm.videos, 2);
    });
  }

  function onConvert() {
    vm.uploading = true;
  }

  function onUpload() {
    vm.uploading = false;
    fetchImages();
    fetchVideoClips();
  }

  function selectMedia(media) {
    vm.selecting = false;
    mediaSelectorService.selectMedia(media);
  }

  function onMediaInsert(type) {
    type == 'image' ? showImages() : showVideos();
    vm.selecting = true;
  }

  function showImages() {
    vm.display.images = true;
    vm.display.videos = false;
  }

  function showVideos() {
    vm.display.images = false;
    vm.display.videos = true;
  }
}

module.exports = component;
