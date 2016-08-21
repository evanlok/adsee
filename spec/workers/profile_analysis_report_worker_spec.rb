require 'rails_helper'

RSpec.describe ProfileAnalysisReportWorker do
  let(:report) { create(:profile_report, :with_attachment) }
  let(:email) { Faker::Internet.email }
  let(:email_io) { StringIO.new(email) }
  subject { ProfileAnalysisReportWorker.new(report.id) }

  describe '#perform' do
    before do
      expect(subject).to receive(:open_email_file).and_yield(email_io)
    end

    it 'processes batch of emails' do
      expect(subject).to receive(:process_batch).with([email])
      subject.perform
    end

    context 'for large numbers of emails' do
      let(:emails) { Array.new(6) { Faker::Internet.email } }
      let(:email_io) { StringIO.new(emails.join("\n")) }

      before do
        stub_const('ProfileAnalysisReportWorker::BATCH_SIZE', 5)
      end

      it 'processes emails in multiple batches' do
        expect(subject).to receive(:process_batch).twice
        subject.perform
      end

      it 'merges batch results together' do
        aggregate_results = double(:results, as_json: {})
        allow_any_instance_of(Profiles::AggregateCalculator).to receive(:run) { aggregate_results }
        expect(subject.instance_variable_get(:@aggregates)).to receive(:merge!).with(aggregate_results).twice
        subject.perform
      end
    end

    it 'sets report status to processed' do
      subject.perform
      expect(report.reload.status).to eq('processed')
    end
  end
end
