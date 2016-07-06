/*@ngInject*/
function MediaSelector() {
  var mediaInsertCallbacks = [];
  var mediaSelectedCallbacks = {};
  var currentSceneAttributeName;
  var globalCallbackName = 'global';

  this.onMediaInsert = function (callback) {
    mediaInsertCallbacks.push(callback);
  };

  this.insertMedia = function (sceneAttributeName, type) {
    currentSceneAttributeName = sceneAttributeName;

    _.each(mediaInsertCallbacks, function (callback) {
      callback(type);
    });
  };

  this.onMediaSelected = function (sceneAttributeName, callback) {
    if (_.isString(sceneAttributeName)) {
      mediaSelectedCallbacks[sceneAttributeName] = callback;
    } else {
      mediaSelectedCallbacks[globalCallbackName] = sceneAttributeName;
    }
  };

  this.selectMedia = function (media) {
    if (mediaSelectedCallbacks[currentSceneAttributeName]) {
      mediaSelectedCallbacks[currentSceneAttributeName](media);

      if (mediaSelectedCallbacks[globalCallbackName])
        mediaSelectedCallbacks[globalCallbackName](media);

      currentSceneAttributeName = null;
    }
  };

  this.removeMediaSelectCallback = function (sceneAttributeName) {
    delete mediaSelectedCallbacks[sceneAttributeName];
  };

  this.reset = function () {
    mediaSelectedCallbacks = _.pick(mediaSelectedCallbacks, [globalCallbackName]);
    currentSceneAttributeName = null;
  };

  this.resetCurrentAttribute = function () {
    currentSceneAttributeName = null;
  };
}

module.exports = MediaSelector;
