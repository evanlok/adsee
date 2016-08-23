import templateUrl from './profile_report.html';

class ProfileReportController {
  /* @ngInject */
  constructor($q, plotlyService) {
    this.$q = $q;
    this.plotlyService = plotlyService;
  }

  $onInit() {
    this.tableAttributes = ['name', 'age', 'gender', 'male', 'female', 'photo', 'location', 'company', 'interests',
      'linkedin', 'facebook', 'twitter', 'pinterest'];
    this.plotlyConfig = {showLink: false, displaylogo: false};
  }

  $onChanges(changes) {
    if (changes.profileReport) {
      this.renderCharts();
    }
  }

  renderCharts() {
    this.renderMatchBarChart();
    this.renderUSHeatmap();
    this.renderWorldHeatmap();
  }

  renderMatchBarChart() {
    this.plotlyService.load((Plotly) => {
      let data = [{
        type: 'bar',
        x: _.map(this.tableAttributes, (attr) => this.matchPercentage(attr)),
        y: this.tableAttributes,
        orientation: 'h'
      }];

      let layout = {
        title: 'Match Percentage',
        xaxis: {
          ticksuffix: '%'
        }
      };

      Plotly.newPlot('matches-bar-chart', data, layout, this.plotlyConfig);
    });
  }

  renderUSHeatmap() {
    this.plotlyService.load((Plotly, usStates) => {
      let stateCodes = _.keys(this.profileReport.states);

      let data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: stateCodes,
        z: _.values(this.profileReport.states),
        text: _.map(stateCodes, (code) => usStates[code]),
        zmin: 0,
        autocolorscale: true,
        colorbar: {
          title: 'Matches'
        }
      }];

      let layout = {
        title: 'Matches in the USA',
        geo: {
          scope: 'usa'
        }
      };

      Plotly.plot('us-heatmap', data, layout, this.plotlyConfig);
    });
  }

  renderWorldHeatmap() {
    this.plotlyService.load((Plotly, usStates, countryData) => {
      let countryCodes = _.keys(this.profileReport.countries);

      let data = [{
        type: 'choropleth',
        locations: _.map(countryCodes, (code) => countryData.countries[code].alpha3),
        z: _.values(this.profileReport.countries),
        text: _.map(countryCodes, (code) => countryData.countries[code].name),
        autocolorscale: true,
        zmin: 0,
        colorbar: {
          title: 'Matches'
        }
      }];

      var layout = {
        title: 'Matches in the world',
        geo: {
          showframe: false
        }
      };

      Plotly.plot('world-heatmap', data, layout, this.plotlyConfig);
    });
  }

  matchPercentage(attrName) {
    return this.profileReport[attrName] / this.profileReport.total * 100;
  }
}

const component = {
  templateUrl: templateUrl,
  controller: ProfileReportController,
  bindings: {
    profileReport: '<'
  }
};

export default component;
