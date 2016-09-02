import templateUrl from './ad_insights.html';

class AdInsightsController {
  /* @ngInject */
  constructor(ezfb) {
    this.ezfb = ezfb;
  }

  $onInit() {
    this.loading = true;
    this.insights = {};

    this.fetchAdInsights().then(data => {
      this.insights = data;
      this.insights.summary.summary = true;
      this.insightsData = [data.summary].concat(data.data);
      this.loading = false;
    });
  }

  fetchAdInsights() {
    return this.ezfb.getLoginStatus().then(() => {
      return this.ezfb.api('/6040042494332/insights', {
        date_preset: 'lifetime',
        time_increment: 1,
        fields: 'impressions, actions, total_unique_actions, call_to_action_clicks, clicks, cost_per_10_sec_video_view, cost_per_action_type, ' +
        'cpc, cpm, cpp, ctr, frequency, reach, relevance_score, spend, inline_link_clicks, inline_link_click_ctr, ' +
        'video_10_sec_watched_actions, video_avg_pct_watched_actions, video_avg_sec_watched_actions, video_avg_time_watched_actions, video_p25_watched_actions, ' +
        'video_p50_watched_actions, video_p75_watched_actions, video_p95_watched_actions, video_p100_watched_actions',
        action_breakdowns: ['action_type'],
        default_summary: true,
        limit: 100
      });
    });
  }

  valueForActionType(data, actionType) {
    let result = _.find(data.actions, {action_type: actionType});
    return result ? result.value : 0;
  }

  costPerActionType(data, actionType) {
    let result = _.find(data.cost_per_action_type, {action_type: actionType});
    return result ? result.value : 0;
  }

  valueForVideoViews(data, key) {
    let result = _.find(data[key], {action_type: 'video_view'});
    return result ? result.value : 0;
  }
}

const component = {
  templateUrl: templateUrl,
  controller: AdInsightsController,
  bindings: {
    facebookAd: '<'
  }
};

export default component;
