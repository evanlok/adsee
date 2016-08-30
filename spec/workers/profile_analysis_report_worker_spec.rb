require 'rails_helper'

RSpec.describe ProfileAnalysisReportWorker do
  let(:report) { create(:profile_report) }
  let(:emails) { Faker::Internet.email }
  subject { ProfileAnalysisReportWorker.new }

  describe '#perform' do
    context 'for a single batch' do
      before do
        expect_any_instance_of(ProfileReport).to receive(:emails_in_batches).and_yield(emails)
      end

      it 'processes batch of emails' do
        expect(subject).to receive(:process_batch).with(emails)
        subject.perform(report.id)
      end

      it 'sets report status to processed' do
        subject.perform(report.id)
        expect(report.reload.status).to eq('processed')
      end
    end

    context 'for large numbers of emails' do
      let(:emails) { Array.new(6) { Faker::Internet.email } }

      before do
        stub_const('ProfileAnalysisReportWorker::BATCH_SIZE', 5)
        expect_any_instance_of(ProfileReport).to receive(:emails_in_batches)
                                                   .and_yield(emails.first(5)).and_yield([emails.last])
      end

      it 'processes emails in multiple batches' do
        expect(subject).to receive(:process_batch).twice
        subject.perform(report.id)
      end

      it 'merges batch results together' do
        aggregate_results = double(:results, as_json: {})
        allow_any_instance_of(Profiles::AggregateCalculator).to receive(:run) { aggregate_results }
        expect_any_instance_of(Profiles::ReportAggregates).to receive(:merge!).with(aggregate_results).twice
        subject.perform(report.id)
      end
    end
  end
end
