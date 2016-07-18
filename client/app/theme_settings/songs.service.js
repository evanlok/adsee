/*@ngInject*/
function songsService($q, songs) {
  this.query = function () {
    var deferred = $q.defer();
    deferred.resolve(songs);
    return deferred.promise;
  };
}

module.exports = songsService;
