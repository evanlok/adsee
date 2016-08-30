require 'rails_helper'

RSpec.describe Facebook::CustomAudienceBuilder do
  let(:report) { create(:profile_report) }
  let(:ad_account_id) { 'act_12345' }
  let(:marketing_api_client) { double(:marketing_api_client) }
  subject { Facebook::CustomAudienceBuilder.new(report, ad_account_id) }

  before do
    allow(subject).to receive(:marketing_api_client) { marketing_api_client }
  end

  describe '#create' do
    it 'creates new custom audience with report title and description' do
      expected_params = { name: report.title, description: report.description, subtype: 'CUSTOM' }
      expect(marketing_api_client).to receive(:create_custom_audience).with(expected_params) { { 'id' => '123' } }
      subject.create
    end

    it 'updates report.custom_audience_id from response' do
      expect(marketing_api_client).to receive(:create_custom_audience) { { 'id' => '123' } }
      subject.create
      expect(report.reload.custom_audience_id).to eq('123')
    end
  end

  describe '#add_users' do
    let(:emails) { [Faker::Internet.email] }

    before do
      allow(report).to receive(:emails_in_batches).and_yield(emails)
    end

    it 'hashes emails and sends them in batches to facebook api' do
      report.custom_audience_id = '555'
      expected_params = {
        payload: {
          schema: 'EMAIL_SHA256',
          data: emails.map { |email| Digest::SHA256.hexdigest(email) }
        }.to_json
      }

      expect(marketing_api_client).to receive(:add_users_to_custom_audience)
                                        .with(report.custom_audience_id, expected_params)
      subject.add_users
    end
  end
end
