require 'rails_helper'

RSpec.describe Profiles::FullContactImporter do
  let(:client) { instance_double('Profiles::FullContactApiClient', batch_get_people: response) }
  subject(:full_contact_importer) { Profiles::FullContactImporter.new(client) }

  describe '#import' do
    let(:emails) { [Faker::Internet.email] }
    let(:response) do
      { responses: { "#{Faker::Internet.url}?email=#{emails.first}" => { key: 'value' } } }.stringify_keys
    end

    it 'imports profile data' do
      subject.import(emails)
      expect(Profile.where(email: emails.first).exists?).to be true
    end

    context 'when emails exceeds batch size limit' do
      let(:emails) { Array.new(Profiles::FullContactApiClient::BATCH_LIMIT * 2) { Faker::Internet.email } }

      it 'makes multiple client requests' do
        expect(client).to receive(:batch_get_people).twice
        expect(Profile).to receive(:import).twice
        subject.import(emails)
      end
    end
  end
end
