require 'digest'

module Facebook
  class CustomAudienceBuilder
    BATCH_SIZE = 10_000 # Facebook limit for number of emails that can be added in one request

    def initialize(profile_report, ad_account_id)
      @profile_report = profile_report
      @ad_account_id = ad_account_id
    end

    def create_and_add_users
      create && add_users
    end

    def create
      return if @profile_report.custom_audience_id

      params = {
        name: @profile_report.title,
        description: @profile_report.description,
        subtype: 'CUSTOM'
      }

      response = marketing_api_client.create_custom_audience(params)
      @profile_report.update(custom_audience_id: response['id'])
    end

    def add_users
      @profile_report.emails_in_batches(BATCH_SIZE) do |emails|
        hashed_emails = emails.map { |email| Digest::SHA256.hexdigest(email) }

        params = {
          payload: {
            schema: 'EMAIL_SHA256',
            data: hashed_emails
          }.to_json
        }

        marketing_api_client.add_users_to_custom_audience(@profile_report.custom_audience_id, params)
      end
    end

    private

    def marketing_api_client
      @marketing_api_client ||= Facebook::MarketingAPIClient.for_user(@profile_report.user, @ad_account_id)
    end
  end
end
