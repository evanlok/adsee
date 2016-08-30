import templateUrl from './profile_report_list.html';

class ProfileReportListController {
  /* @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  $onChanges(changes) {
    if (changes.profileReports && changes.profileReports.currentValue) {
      this.totalItems = this.profileReports.$httpHeaders('Total');
      this.itemsPerPage = this.profileReports.$httpHeaders('Per-Page');
      this.profileReports = _.cloneDeep(this.profileReports);
    }

    if (changes.currentPage && changes.currentPage.currentValue) {
      this.currentPage = parseInt(this.currentPage);
    }
  }

  pageChanged() {
    this.$state.go('profileReports', {page: this.currentPage});
  }
}

const component = {
  templateUrl: templateUrl,
  controller: ProfileReportListController,
  bindings: {
    profileReports: '<',
    currentPage: '@'
  }
};

export default component;
