var Howl = require('howler').Howl;

/*@ngInject*/
function SongModalController($scope, $uibModalInstance, currentSong, songsService) {
  $scope.currentSong = currentSong;
  $scope.groupedSongs = _.chunk(songsService.get(), 4);
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
