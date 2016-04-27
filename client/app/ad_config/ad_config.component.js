var templateUrl = require('./ad_config.html');

var component = {
  templateUrl: templateUrl,
  controller: AdConfigController,
  bindings: {
    onAddScene: '&'
  }
};

/*@ngInject*/
function AdConfigController() {
  var vm = this;

  vm.$onInit = function () {

  };
}

module.exports = component;
