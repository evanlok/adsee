import {sha256} from 'js-sha256';

class CustomAudienceService {
  /*@ngInject*/
  constructor($q, ezfb) {
    this.$q = $q;
    this.ezfb = ezfb;
  }

  create(adAccountId, name, description, file) {
    let parsedEmails = [];

    return this.parseFile(file).then(emails => {
      parsedEmails = emails;
    }).then(() => {
      return this.createCustomAudience(adAccountId, name, description);
    }).then(data => {
      return this.addUsersToCustomAudience(data.id, parsedEmails);
    });
  }

  createCustomAudience(adAccountId, name, description) {
    const params = {
      name: name,
      description: description,
      subtype: 'CUSTOM'
    };

    return this.ezfb.api(`${adAccountId}/customaudiences`, 'POST', params);
  }

  addUsersToCustomAudience(customAudienceId, emails) {
    let promises = [];
    const emailGroups = _.chunk(emails, 10000);

    _.each(emailGroups, emailGroup => {
      let data = _.map(emailGroup, email => {
        return sha256(email);
      });

      let params = {
        payload: {
          schema: 'EMAIL_SHA256',
          data: data
        }
      };

      promises.push(this.ezfb.api(`${customAudienceId}/users`, 'POST', params));
    });

    return this.$q.all(promises);
  }

  parseFile(file) {
    const deferred = this.$q.defer();
    const reader = new FileReader();

    reader.onload = () => {
      try {
        let emails = [];
        let lines = reader.result.split('\n');

        _.each(lines, line => {
          if (_.includes(line, '@')) {
            emails.push(_.trim(line));
          }
        });

        deferred.resolve(emails);
      }
      catch (error) {
        deferred.reject(error);
      }
    };

    reader.readAsText(file);

    return deferred.promise;
  }
}

export default CustomAudienceService;
