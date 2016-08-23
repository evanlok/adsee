import profileReport from './profile_report.component';
import profileReportService from './profile_report.service';
const reports = angular.module('adsee.reports', []);

reports
  .component('profileReport', profileReport)
  .service('profileReportService', profileReportService);

export default reports.name;
