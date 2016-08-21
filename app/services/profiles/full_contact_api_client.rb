module Profiles
  class FullContactApiClient
    BatchLimitExceededError = Class.new(StandardError)

    FULL_CONTACT_BASE_URL = 'https://api.fullcontact.com/v2'.freeze
    BATCH_LIMIT = 20

    attr_reader :api_key

    def initialize(api_key = ENV['FULL_CONTACT_API_KEY'])
      @api_key = api_key
    end

    def batch_get_people(emails)
      if emails.count > BATCH_LIMIT
        raise BatchLimitExceededError, "Batch API has a limit of #{BATCH_LIMIT} emails per batch"
      end

      requests = Array.wrap(emails).map do |email|
        "#{FULL_CONTACT_BASE_URL}/person.json?email=#{email}&macromeasures=true&style=dictionary"
      end

      http_client.post('batch.json', requests: requests).body
    end

    private

    def http_client
      @http_client ||= Faraday.new(FULL_CONTACT_BASE_URL, headers: { 'X-FullContact-APIKey' => api_key }) do |f|
        f.request :json
        f.request :retry
        f.response :logger, Rails.logger
        f.response :raise_error
        f.response :json
        f.adapter Faraday.default_adapter
      end
    end
  end
end
