class PlotlyService {
  /* @ngInject */
  constructor($q) {
    this.$q = $q;
  }

  load(callback) {
    require.ensure(['../../js/plotly-bundle.js', 'datasets-us-states-abbr-names', 'country-data'], (require) => {
      let Plotly = require('../../js/plotly-bundle.js');
      let usStates = require('datasets-us-states-abbr-names');
      let countryData = require('country-data');

      callback(Plotly, usStates, countryData);
    });
  }
}

export default PlotlyService;
