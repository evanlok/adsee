function songsService(songs) {
  this.get = function () {
    return songs;
  };
}

module.exports = songsService;
