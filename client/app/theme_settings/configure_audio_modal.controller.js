var Recorder = require('./../../js/recorder');
var filepicker = require('filepicker-js');
var moment = require('moment');

/*@ngInject*/
function ConfigureAudioModalController($scope, $uibModalInstance, $window, audioUrl, S3_BUCKET_NAME) {
  var audioContext, micPermission, recorder, currentAudioBlob;

  $scope.audioUrl = audioUrl;
  $scope.recording = false;
  $scope.maxDuration = 90;
  $scope.uploading = false;
  $scope.uploadPercent = 0;

  $scope.startRecording = startRecording;
  $scope.stopRecording = stopRecording;
  $scope.maxDurationReached = maxDurationReached;
  $scope.save = save;
  $scope.uploadFile = uploadFile;

  try {
    $window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
    $window.navigator.getUserMedia = $window.navigator.getUserMedia || $window.navigator.webkitGetUserMedia;
    $window.URL = $window.URL || $window.webkitURL;
    audioContext = new AudioContext;
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  $window.navigator.getUserMedia({audio: true}, startUserMedia, function (e) {
    console.log('No live audio input: ' + e);
  });

  function startUserMedia(stream) {
    micPermission = true;
    var input = audioContext.createMediaStreamSource(stream);
    recorder = new Recorder(input);
  }

  function startRecording() {
    if (!micPermission) {
      alert('Browser microphone permission is required to record audio.');
      return;
    }

    recorder && recorder.record();
    $scope.recording = true;
    $scope.$broadcast('timer-start');
  }

  function stopRecording() {
    recorder && recorder.stop();
    $scope.recording = false;
    exportWAV();
    recorder.clear();
    $scope.$broadcast('timer-clear');
  }

  function maxDurationReached() {
    $scope.stopRecording();
    $scope.$apply();
  }

  function save() {
    if (currentAudioBlob) {
      var file = new File([currentAudioBlob], 'audio.wav');

      filepicker.store(file, {
          filename: moment().unix() + '.wav',
          container: S3_BUCKET_NAME,
          path: '/recorded_audio/',
          access: 'public'
        },
        function onSuccess(newBlob) {
          $scope.uploading = false;
          $uibModalInstance.close(newBlob.key);
          $scope.$apply();
        },
        function onError(FPError) {
          console.log(FPError);
        },
        function onProgress(percent) {
          $scope.uploading = true;
          $scope.uploadPercent = percent;
          $scope.$apply();
        }
      );
    } else {
      $uibModalInstance.dismiss();
    }
  }

  function exportWAV() {
    recorder.exportWAV(function (blob) {
      currentAudioBlob = blob;
      $scope.audioUrl = $window.URL.createObjectURL(blob);
      $scope.$apply();
    });
  }

  function uploadFile() {
    var pickerOptions = {
      maxFiles: 1,
      mimetype: 'audio/*',
      maxSize: (50 * 1024 * 1024)
    };

    var storageOptions = {
      location: 'S3',
      path: '/uploaded_audio/',
      access: 'public',
      storeContainer: S3_BUCKET_NAME
    };

    filepicker.pickAndStore(pickerOptions, storageOptions,
      function onSuccess(blobs) {
        $uibModalInstance.close(blobs[0].key);
      }
    );
  }
}

module.exports = ConfigureAudioModalController;
