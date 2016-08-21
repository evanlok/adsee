require 'rails_helper'

RSpec.describe Profiles::FullContactApiClient do
  let(:api_key) { 'api_key' }
  let(:headers) { { 'X-FullContact-APIKey' => api_key } }
  subject(:client) { Profiles::FullContactApiClient.new(api_key) }

  describe '#batch_get_people' do
    let(:email) { Faker::Internet.email }
    let(:body) do
      {
        requests: [
          "#{subject.class::FULL_CONTACT_BASE_URL}/person.json?email=#{email}&macromeasures=true&style=dictionary"
        ]
      }
    end

    it 'sends batch request from list of emails' do
      stub = stub_request(:post, "#{subject.class::FULL_CONTACT_BASE_URL}/batch.json")
               .with(body: body, headers: headers)
      subject.batch_get_people([email])
      expect(stub).to have_been_requested
    end

    context 'when number of emails exceeds the batch limit' do
      it 'raises exception' do
        emails = Array.new(Profiles::FullContactApiClient::BATCH_LIMIT + 1) { 'email@email.com' }
        expect { client.batch_get_people(emails) }
          .to raise_error(Profiles::FullContactApiClient::BatchLimitExceededError)
      end
    end
  end
end
