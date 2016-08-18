module Profiles
  class FullContactImporter
    attr_reader :client

    def initialize(client = Profiles::FullContactApiClient.new)
      @client = client
    end

    def import(emails)
      emails.in_groups_of(Profiles::FullContactApiClient::BATCH_LIMIT, false).each do |batch|
        response = client.batch_get_people(batch)
        columns = %w(email data)
        values = []

        response['responses'].each do |request_url, data|
          email = Addressable::URI.parse(request_url).query_values['email']
          values << [email, data]
        end

        Profile.import(columns, values,
                       validate: false,
                       on_duplicate_key_update: {
                         conflict_target: [:email], columns: [:data]
                       })
      end
    end
  end
end
