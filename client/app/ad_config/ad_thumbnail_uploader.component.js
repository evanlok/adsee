var filepicker = require('filepicker-js');
var templateUrl = require('./ad_thumbnail_uploader.html');

var component = {
  templateUrl: templateUrl,
  controller: AdThumbnailUploaderController,
  bindings: {
    onUpload: '&'
  }
};

/*@ngInject*/
function AdThumbnailUploaderController(S3_BUCKET_NAME) {
  var vm = this;

  var pickerOptions = {
    mimetype: ['image/*'],
    multiple: false,
    maxSize: (50 * 1024 * 1024), // 50MB
    imageQuality: 90,
    imageDim: [1920, 1080],
    cropRatio: 16 / 9
  };

  var storageOptions = {
    location: 'S3',
    path: '/video_ad_thumbnails/',
    access: 'public',
    storeContainer: S3_BUCKET_NAME
  };

  vm.uploadImage = uploadImage;

  function uploadImage() {

    filepicker.pickAndStore(pickerOptions, storageOptions, function onSuccess(blobs) {
      vm.onUpload({url: blobs[0].url});
    });
  }
}

module.exports = component;
