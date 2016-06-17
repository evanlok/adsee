var templateUrl = require('./icon.html');

var component = {
  templateUrl: templateUrl,
  controller: IconController,
  bindings: {
    icon: '<'
  }
};

/*@ngInject*/
function IconController($sce) {
  var vm = this;

  vm.$onInit = function () {

  };

  vm.emoji = emoji;

  function emoji(name) {
    return $sce.trustAsHtml(emojione.shortnameToImage(':' + name +':'));
  }
}

module.exports = component;
