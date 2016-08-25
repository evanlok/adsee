class AdAccountService {
  /* @ngInject */
  constructor(ezfb) {
    this.ezfb = ezfb;
  }

  query() {
    return this.ezfb.getLoginStatus().then(() => {
      return this.ezfb.api('/me/adaccounts', {fields: 'id, account_id, name, business_name'});
    });
  }

  formatAdAccount(adAccount) {
    return (adAccount.business_name || adAccount.name) + ' (' + adAccount.account_id + ')';
  }
}

export default AdAccountService;
