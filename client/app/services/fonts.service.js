/*@ngInject*/
function fontsService($q, fonts) {
  this.query = function () {
    var deferred = $q.defer();
    deferred.resolve(fonts);
    return deferred.promise;
  };
}

module.exports = fontsService;
