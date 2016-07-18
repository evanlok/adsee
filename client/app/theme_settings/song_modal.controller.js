var Howl = require('howler').Howl;
var chunkify = require('../../js/chunkify');

/*@ngInject*/
function SongModalController($scope, $uibModalInstance, currentSong, songsService) {
  $scope.currentSong = currentSong;

  songsService.query().then(function (data) {
    $scope.songsByCategory = _.groupBy(data, 'song_category');
    $scope.songCategoryGroups = chunkify(_.keys($scope.songsByCategory), 4, true);
  });

  $scope.songPlaying = undefined;
  var sound;

  $scope.play = play;
  $scope.stop = stop;

  $uibModalInstance.result.finally(function () {
    if (sound) {
      sound.unload();
    }
  });

  function play(song) {
    if (sound) {
      stop();
    }

    setupPlayer(song.url);
    song.playing = true;
    $scope.songPlaying = song;
    sound.play();
  }

  function stop() {
    sound.unload();
    $scope.songPlaying.playing = false;
  }

  function setupPlayer(url) {
    sound = new Howl({
      urls: [url],
      onend: function () {
        $scope.songPlaying.playing = false;
      }
    });
  }
}

module.exports = SongModalController;
