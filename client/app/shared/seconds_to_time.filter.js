function secondsToTime($filter) {
  return function (seconds) {
    return $filter('date')(new Date(0, 0, 0).setSeconds(seconds), 'mm:ss');
  };
}

module.exports = secondsToTime;
