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

  $postLink() {
    this.renderCharts();
  }

  renderCharts() {
    this.renderMatchBarChart();
    this.renderAgeRangesColumnChart();
    this.renderGenerationsColumnChart();
    this.renderUSHeatmap();
    this.renderWorldHeatmap();
    this.renderGenderPieChart();
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

  renderAgeRangesColumnChart() {
    this.plotlyService.load((Plotly) => {
      let keys = _.keys(this.profileReport.age_ranges).sort();
      let values = _.map(keys, key => {
        return this.profileReport.age_ranges[key];
      });

      let data = [
        {
          x: keys,
          y: values,
          type: 'bar'
        }
      ];

      let layout = {
        title: 'Age Ranges',
      };

      Plotly.newPlot('age-range-column-chart', data, layout, this.plotlyConfig);
    });
  }

  renderGenerationsColumnChart() {
    this.plotlyService.load((Plotly) => {
      let buckets = {
        'Gen Z': 0,
        'Millennial': 0,
        'Gen X': 0,
        'Baby Boomer': 0,
        'Silent Generation': 0
      };

      _.each(this.profileReport.ages, (v, k) => {
        if (_.inRange(k, 0, 21)) {
          buckets['Gen Z'] += v;
        } else if (_.inRange(k, 21, 40)) {
          buckets['Millennial'] += v;
        } else if (_.inRange(k, 40, 52)) {
          buckets['Gen X'] += v;
        } else if (_.inRange(k, 52, 71)) {
          buckets['Baby Boomer'] += v;
        } else if (_.inRange(k, 71, 150)) {
          buckets['Silent Generation'] += v;
        }
      });

      let data = [
        {
          x: _.keys(buckets),
          y: _.values(buckets),
          type: 'bar'
        }
      ];

      let layout = {
        title: 'Generation',
      };

      Plotly.newPlot('generation-column-chart', data, layout, this.plotlyConfig);
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

  renderGenderPieChart() {
    this.plotlyService.load((Plotly) => {
      let data = [
        {
          labels: ['Male', 'Female'],
          values: [this.profileReport.male, this.profileReport.female],
          type: 'pie'
        }
      ];

      let layout = {
        title: 'Gender',
      };

      Plotly.newPlot('gender-pie-chart', data, layout, this.plotlyConfig);
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
