import profileReport from './profile_report.component';
import profileReportList from './profile_report_list.component';
const reports = angular.module('adsee.reports', []);

reports
  .component('profileReportList', profileReportList)
  .component('profileReport', profileReport);

export default reports.name;
