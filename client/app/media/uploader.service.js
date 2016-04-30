var filepicker = require('filepicker-js');

/*@ngInject*/
function UploaderService($q, imageService, videoClipService, S3_BUCKET_NAME) {
  var pickerOptions = {
    mimetype: ['image/*', 'video/*'],
    multiple: true,
    maxSize: (50 * 1024 * 1024), // 50MB
    imageQuality: 90,
    imageDim: [1920, 1080],
    cropRatio: 16 / 9
  };

  var storageOptions = {
    location: 'S3',
    path: '/media_library/',
    access: 'public',
    storeContainer: S3_BUCKET_NAME
  };

  var conversionStorageOptions = {
    location: 'S3',
    path: '/media_library/',
    access: 'public',
    container: S3_BUCKET_NAME
  };

  var mainConversionOptions = {
    width: 1920,
    height: 1080,
    fit: 'crop',
    quality: 90
  };

  var thumbnailConversionOptions = {
    width: 320,
    height: 180,
    fit: 'crop',
    quality: 90
  };

  this.uploadFiles = function (stockUpload) {
    var deferred = $q.defer();

    var dialog = filepicker.pickAndStore(pickerOptions, storageOptions,
      function onSuccess(blobs) {
        $q.all([generateImageVersions(blobs, stockUpload), saveVideoClips(blobs, stockUpload)]).then(function onSuccess(results) {
          deferred.resolve(dialog, results[0], results[1]);
        }, function onError() {
          deferred.reject(dialog);
        });
      }, function onError(FPError) {
        deferred.reject(dialog, FPError);
      }
    );

    return deferred.promise;
  };

  function generateImageVersions(blobs, stockUpload) {
    var promises = [];
    var imageBlobs = _.filter(blobs, function (blob) {
      return blob.mimetype.match(/image/);
    });

    _.each(imageBlobs, function (originalBlob) {
      var deferred = $q.defer();
      promises.push(deferred.promise);

      var mainImage = convertImage(originalBlob, mainConversionOptions);
      var thumbnailImage = convertImage(originalBlob, thumbnailConversionOptions);

      // Don't save image if any of the conversions fail
      $q.all([mainImage, thumbnailImage]).then(function (convertedImages) {
        saveImage(originalBlob, convertedImages[0], convertedImages[1], stockUpload).then(function (image) {
          deferred.resolve(image);
        }, function onError() {
          deferred.reject();
        });
      });
    });

    return $q.all(promises);
  }

  function convertImage(blob, conversionOptions) {
    var deferred = $q.defer();

    filepicker.convert(blob, conversionOptions, conversionStorageOptions,
      function onSuccess(blob) {
        deferred.resolve(blob);
      },
      function onError(FPError) {
        deferred.reject(FPError);
      }
    );

    return deferred.promise;
  }

  function saveImage(originalImage, convertedImage, thumbnailImage, stockUpload) {
    var fnName = stockUpload ? 'saveStock' : 'save';

    return imageService[fnName]({}, {
      filename: originalImage.filename,
      original_path: originalImage.key,
      path: convertedImage.key,
      thumbnail_path: thumbnailImage.key,
      file_size: originalImage.size,
      filestack_url: originalImage.url
    });
  }

  function saveVideoClips(blobs, stockUpload) {
    var videoBlobs = _.filter(blobs, function (blob) {
      return blob.mimetype.match(/video/);
    });

    return $q.all(_.map(videoBlobs, function (blob) {
      var fnName = stockUpload ? 'saveStock' : 'save';

      return videoClipService[fnName]({}, {
        filename: blob.filename,
        original_path: blob.key,
        filestack_url: blob.url,
        file_size: blob.size
      });
    }));
  }
}

module.exports = UploaderService;
