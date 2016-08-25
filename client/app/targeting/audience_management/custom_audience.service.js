import {sha256} from 'js-sha256';

class CustomAudienceService {
  /*@ngInject*/
  constructor($q, ezfb) {
    this.$q = $q;
    this.ezfb = ezfb;
  }

  query(adAccountId) {
    return this.ezfb.getLoginStatus().then(() => {
      return this.ezfb.api(adAccountId + '/customaudiences', {
        limit: 1000,
        fields: 'id, approximate_count, data_source, name, description, subtype, time_created, operation_status'
      });
    });
  }

  createCustomAudience(adAccountId, params, file) {
    let parsedEmails = [];

    return this.parseFile(file).then(emails => {
      parsedEmails = emails;
    }).then(() => {
      return this.createCustomAudienceRecord(adAccountId, params);
    }).then(data => {
      return this.addUsersToCustomAudience(data.id, parsedEmails);
    });
  }

  createLookalikeAudience(adAccountId, params) {
    const deferred = this.$q.defer();
    params.subtype = 'LOOKALIKE';

    this.ezfb.api(`${adAccountId}/customaudiences`, 'POST', params).then(data => {
      if (data.error) {
        deferred.reject(data);
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
  }

  createCustomAudienceRecord(adAccountId, params) {
    const deferred = this.$q.defer();
    params.subtype = 'CUSTOM';

    this.ezfb.api(`${adAccountId}/customaudiences`, 'POST', params).then(data => {
      if (data.error) {
        deferred.reject(data);
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
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

      let deferred = this.$q.defer();

      this.ezfb.api(`${customAudienceId}/users`, 'POST', params).then(data => {
        if (data.error) {
          deferred.reject(data);
        } else {
          deferred.resolve(data);
        }
      });

      promises.push(deferred.promise);
    });

    return this.$q.all(promises);
  }

  parseFile(file) {
    const deferred = this.$q.defer();
    const reader = new FileReader();

    try {
      reader.onload = () => {

        let emails = [];
        let lines = reader.result.split('\n');

        _.each(lines, line => {
          if (_.includes(line, '@')) {
            emails.push(_.trim(line));
          }
        });

        deferred.resolve(emails);
      };

      reader.readAsText(file);
    } catch (error) {
      deferred.reject({error: {message: 'There was an error parsing your file', type: 'FileParseError', exception: error}});
    }

    return deferred.promise;
  }
}

export default CustomAudienceService;
