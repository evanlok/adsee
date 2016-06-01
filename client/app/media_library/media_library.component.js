var templateUrl = require('./media_library.html');

var component = {
  templateUrl: templateUrl,
  controller: MediaLibraryController,
  bindings: {
    onClose: '&'
  }
};

/*@ngInject*/
function MediaLibraryController($interval, imageService, videoClipService, mediaSelectorService) {
  var vm = this;
  var loadedContent, videoPoller;

  vm.$onInit = function () {
    vm.images = [];
    vm.videos = [];
    vm.stockImages = [];
    vm.stockVideos = [];
    vm.uploading = false;
    vm.selecting = false;
    vm.display = {images: true, videos: false, stockImages: false, stockVideos: false};
    loadedContent = {images: false, videos: false, stockImages: false, stockVideos: false};
    mediaSelectorService.onMediaInsert(onMediaInsert);
    loadContent('images');
  };

  vm.onConvert = onConvert;
  vm.onUpload = onUpload;
  vm.selectMedia = selectMedia;
  vm.showTab = showTab;
  vm.deleteMedia = deleteMedia;

  function fetchImages() {
    imageService.query().then(function (data) {
      vm.images = data;
    });
  }

  function fetchVideoClips() {
    return videoClipService.query().then(function (data) {
      vm.videos = data;
    });
  }

  function pollVideoClips() {
    fetchVideoClips().then(function () {
      if (_.some(vm.videos, {url: null})) {
        videoPoller = $interval(function () {
          fetchVideoClips().then(function () {
            if (_.every(vm.videos, 'url') && videoPoller) {
              $interval.cancel(videoPoller);
            }
          });
        }, 3000);
      }
    });
  }

  function fetchStockImages() {
    imageService.query({stock: true}).then(function (data) {
      vm.stockImages = data;
    });
  }

  function fetchStockVideos() {
    videoClipService.query({stock: true}).then(function (data) {
      vm.stockVideos = data;
    });
  }

  function onConvert() {
    vm.uploading = true;
  }

  function onUpload() {
    vm.uploading = false;
    loadContent('images', true);
    loadContent('videos', true);
  }

  function selectMedia(media) {
    vm.selecting = false;
    mediaSelectorService.selectMedia(media);
  }

  function onMediaInsert(type) {
    type == 'image' ? showTab('images') : showTab('videos');
    vm.selecting = true;
  }

  function showTab(type) {
    _.each(vm.display, function (val, key) {
      vm.display[key] = false;
    });

    loadContent(type);
    vm.display[type] = true;
  }

  function loadContent(type, force) {
    if (loadedContent[type] && !force) {
      return;
    }

    switch (type) {
      case 'images':
        fetchImages();
        break;
      case 'videos':
        pollVideoClips();
        break;
      case 'stockImages':
        fetchStockImages();
        break;
      case 'stockVideos':
        fetchStockVideos();
        break;
    }

    loadedContent[type] = true;
  }

  function deleteMedia(media, type) {
    media.$delete().then(function () {
      if (type === 'image') {
        vm.images = _.reject(vm.images, function (item) {
          return item === media;
        });
      } else {
        vm.videos = _.reject(vm.videos, function (item) {
          return item === media;
        });
      }
    });
  }
}

module.exports = component;
