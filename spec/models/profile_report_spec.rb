require 'rails_helper'

RSpec.describe ProfileReport, type: :model do
  let(:host) { Faker::Internet.url }

  around do |example|
    ClimateControl.modify CDN_URL: host do
      example.run
    end
  end

  describe '#file_url' do
    let(:report) { build(:profile_report) }

    it 'returns file_path with CDN host prefixed' do
      expect(report.file_url).to eq("#{host}/#{report.file_path}")
    end
  end

  describe '#open_file' do
    let(:report) { build(:profile_report) }

    it 'streams external file to a tempfile and yields' do
      stub = stub_request(:get, report.file_url).to_return(body: 'email_content')
      expect { |b| report.open_file(&b) }.to yield_with_args(Tempfile)
      expect(stub).to have_been_requested
    end
  end

  describe '#emails_in_batches' do
    let(:report) { build(:profile_report) }
    let(:emails) { [Faker::Internet.email] }
    let(:email_io) { StringIO.new(emails.join("\n")) }

    before do
      expect(report).to receive(:open_file).and_yield(email_io)
    end

    it 'yields batch of emails' do
      expect { |b| report.emails_in_batches(&b) }.to yield_with_args(emails)
    end

    context 'when number of emails exceeds batch size' do
      let(:emails) { Array.new(3) { Faker::Internet.email } }

      it 'yields multiple times' do
        expect { |b| report.emails_in_batches(2, &b) }.to yield_successive_args(emails.first(2), [emails.last])
      end
    end
  end
end
