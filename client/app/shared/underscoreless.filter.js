function underscoreless() {
  return function (input) {
    if (input) {
      return input.replace(/_/g, ' ');
    } else {
      return '';
    }
  };
}

module.exports = underscoreless;
