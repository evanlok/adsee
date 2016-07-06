var templateUrl = require('./media_library.html');

var component = {
  templateUrl: templateUrl,
  controller: MediaLibraryController,
  bindings: {
    onClose: '&'
  }
};

/*@ngInject*/
function MediaLibraryController($interval, imageService, videoClipService, iconService, mediaSelectorService) {
  var vm = this;
  var loadedContent, videoPoller;

  vm.$onInit = function () {
    vm.images = [];
    vm.videos = [];
    vm.stockImages = [];
    vm.stockVideos = [];
    vm.uploading = false;
    vm.selecting = false;
    vm.display = {images: true, videos: false, stockImages: false, stockVideos: false, icons: false};
    vm.searchQuery = '';
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = 0;
    loadedContent = {images: false, videos: false, stockImages: false, stockVideos: false};
    mediaSelectorService.onMediaInsert(onMediaInsert);
    loadContent('images');
  };

  vm.onConvert = onConvert;
  vm.onUpload = onUpload;
  vm.selectMedia = selectMedia;
  vm.showTab = showTab;
  vm.tabDisabled = tabDisabled;
  vm.deleteMedia = deleteMedia;
  vm.filterResults = filterResults;
  vm.pageChanged = pageChanged;
  vm.back = back;

  function fetchImages() {
    imageService.query({q: vm.searchQuery, page: vm.currentPage}).then(function (data) {
      setPaginationData(data);
      vm.images = data;
    });
  }

  function fetchVideoClips() {
    return videoClipService.query({q: vm.searchQuery, page: vm.currentPage}).then(function (data) {
      setPaginationData(data);
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
    imageService.query({stock: true, q: vm.searchQuery, page: vm.currentPage}).then(function (data) {
      setPaginationData(data);
      vm.stockImages = data;
    });
  }

  function fetchStockVideos() {
    videoClipService.query({stock: true, q: vm.searchQuery, page: vm.currentPage}).then(function (data) {
      setPaginationData(data);
      vm.stockVideos = data;
    });
  }

  function fetchIcons() {
    iconService.query({q: vm.searchQuery, page: vm.currentPage}).then(function (data) {
      setPaginationData(data);
      vm.icons = data;
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
    vm.selectingType = null;
    mediaSelectorService.selectMedia(media);
  }

  function onMediaInsert(type) {
    switch (type) {
      case 'image':
        showTab('images');
        break;
      case 'video':
        showTab('videos');
        break;
      case 'icon':
        showTab('icons');
        break;
    }

    vm.selectingType = type;
    vm.selecting = true;
  }

  function showTab(type) {
    _.each(vm.display, function (val, key) {
      vm.display[key] = false;
    });

    vm.currentPage = 1;
    loadContent(type, true);
    vm.display[type] = true;
  }

  function tabDisabled(type) {
    return vm.selectingType && vm.selectingType !== type;
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
      case 'icons':
        fetchIcons();
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

  function currentMediaType() {
    return _.findKey(vm.display, function (v) {
      return v;
    });
  }

  function filterResults() {
    vm.currentPage = 1;
    loadContent(currentMediaType(), true);
  }

  function pageChanged() {
    loadContent(currentMediaType(), true);
  }

  function setPaginationData(resource) {
    vm.totalItems = resource.$httpHeaders('Total');
    vm.itemsPerPage = resource.$httpHeaders('Per-Page');
  }

  function back() {
    mediaSelectorService.resetCurrentAttribute();
    vm.selecting = false;
    vm.selectingType = null;
    vm.onClose();
  }
}

module.exports = component;
