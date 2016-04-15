/*@ngInject*/ function transitionsService(transitions) {
  this.get = function () {
    return transitions;
  };
}

module.exports = transitionsService;
