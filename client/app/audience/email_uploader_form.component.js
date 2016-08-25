import templateUrl from './email_uploader_form.html';
import filepicker from 'filepicker-js';
import toastr from 'toastr';
import path from 'path';

class EmailUploaderFormController {
  /* @ngInject */
  constructor($scope, adAccountService, S3_BUCKET_NAME) {
    this.$scope = $scope;
    this.adAccountService = adAccountService;
    this.S3_BUCKET_NAME = S3_BUCKET_NAME;
  }

  $onInit() {
    this.fetchAdAccounts();
  }

  $onChanges(changes) {
    if (changes.profileReport && !changes.profileReport.currentValue) {
      this.profileReport = {};
    }
  }

  fetchAdAccounts() {
    return this.adAccountService.query().then(data => {
      this.adAccounts = data.data;
    });
  }

  formatAdAccount(adAccount) {
    return this.adAccountService.formatAdAccount(adAccount);
  }

  chooseFile() {
    let pickerOptions = {
      maxFiles: 1,
      mimetype: 'text/*',
      maxSize: 100 * 1024 * 1024
    };

    let storeOptions = {
      location: 'S3',
      storeContainer: this.S3_BUCKET_NAME,
      path: '/customer_files/',
      access: 'public'
    };

    filepicker.pickAndStore(pickerOptions, storeOptions, (blobs) => {
      this.profileReport.file_path = blobs[0].key;
      this.$scope.$apply();
    }, () => {
      toastr.error('There was an error uploading the file');
    });
  }

  reportFilename() {
    if (this.profileReport.file_path) {
      let basename = path.basename(this.profileReport.file_path);
      return basename.split(/_(.+)?/)[1];
    }
  }

  reportFileInvalid() {
    return _.isNil(this.profileReport.file_path) && this.reportForm.$submitted;
  }

  cancel() {
    this.onCancel();
  }

  save() {
    this.reportForm.$setSubmitted();

    if (this.reportForm.$valid && this.profileReport.file_path) {
      let payload = {profileReport: this.profileReport, adAccountId: this.adAccountId};
      this.onSave({$event: payload});
    }
  }
}

const component = {
  templateUrl: templateUrl,
  controller: EmailUploaderFormController,
  bindings: {
    profileReport: '<',
    adAccountId: '@',
    saving: '<',
    onSave: '&',
    onCancel: '&'
  }
};

export default component;
