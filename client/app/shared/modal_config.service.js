/*@ngInject*/
function ModalConfig() {
  var disableBackdropClose = false;

  this.disableBackdropClose = function (val) {
    if (!_.isUndefined(val)) {
      disableBackdropClose = val;
    }

    return disableBackdropClose;
  };
}

module.exports = ModalConfig;
