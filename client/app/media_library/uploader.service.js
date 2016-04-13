var filepicker = require('filepicker-js');

function UploaderService($q, imageService) {
  var pickerOptions = {
    mimetype: ['image/*', 'video/*'],
    multiple: true,
    maxSize: (50 * 1024 * 1024), // 50MB
    imageQuality: 90,
    imageDim: [1920, 1080],
    cropRatio: 16 / 9,
    debug: true
  };

  var storageOptions = {
    location: 'S3',
    path: '/media_library/',
    access: 'public'
  };
  
  this.uploadFiles = function () {
    var deferred = $q.defer();

    var dialog = filepicker.pickAndStore(pickerOptions, storageOptions,
      function onSuccess(blobs) {
        console.log(blobs);

        generateImageVersions(blobs).then(function onSuccess(blobs) {
          deferred.resolve(dialog, blobs);
        }, function onError(dialog) {
          deferred.reject(dialog);
        });
      }, function onError(FPError) {
        deferred.reject(dialog, FPError);
      }
    );

    return deferred.promise;
  };

  function generateImageVersions(blobs) {
    var promises = [];

    _.each(blobs, function (originalBlob) {
      var deferred = $q.defer();
      promises.push(deferred.promise);

      var mainImage = convertImage(originalBlob,
        {
          width: 1920,
          height: 1080,
          fit: 'crop',
          quality: 90
        }
      );

      var thumbnailImage = convertImage(originalBlob,
        {
          width: 320,
          height: 180,
          fit: 'crop',
          quality: 90
        }
      );

      // Don't save image if any of the conversions fail
      $q.all([mainImage, thumbnailImage]).then(function (convertedImages) {
        saveImage(originalBlob, convertedImages[0], convertedImages[1]).then(function (image) {
          deferred.resolve(image);
        }, function onError () {
          deferred.reject();
        });
      });
    });

    return $q.all(promises);
  }

  function convertImage(blob, conversionOptions) {
    var deferred = $q.defer();

    filepicker.convert(blob, conversionOptions, storageOptions,
      function onSuccess(blob) {
        deferred.resolve(blob);
      },
      function onError(FPError) {
        deferred.reject(FPError);
      }
    );

    return deferred.promise;
  }

  function saveImage(originalImage, convertedImage, thumbnailImage) {
    return imageService.save({}, {
      filename: originalImage.filename,
      original_path: originalImage.key,
      path: convertedImage.key,
      thumbnail_path: thumbnailImage.key,
      file_size: originalImage.size,
      filestack_url: originalImage.url
    });
  }
}

module.exports = UploaderService;
