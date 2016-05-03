var constants = angular.module('adsee');

constants
  .constant('facebookAdConfigOptions', {
    call_to_action: {
      BOOK_TRAVEL: 'Book Now',
      DOWNLOAD: 'Download',
      LEARN_MORE: 'Learn More',
      SHOP_NOW: 'Shop Now',
      SIGN_UP: 'Sign Up',
      WATCH_MORE: 'Watch More'
    },
    budget_type: {
      daily: 'Daily Budget',
      lifetime: 'Lifetime Budget'
    },
    optimization_goal: {
      VIDEO_VIEWS: 'Video Views',
      REACH: 'Daily Unique Reach'
    },
    billing_event: {
      IMPRESSIONS: 'Impression - CPM',
      VIDEO_VIEWS: '10 Second Video View'
    },
    pacing_type: {
      standard: 'Standard - Show your ads throughout the day',
      no_pacing: 'Accelerated - Show your ads as quickly as possible'
    }
  });

module.exports = constants.name;
