require 'rails_helper'

RSpec.describe Profiles::ProfileReportBuilder do
  let(:profile_report) { build(:profile_report) }
  let(:ad_account_id) { 'act_1234' }
  let(:custom_audience_generator) { double(:custom_audience_generator) }
  subject { Profiles::ProfileReportBuilder.new(profile_report, ad_account_id) }

  before do
    allow(subject).to receive(:custom_audience_generator) { custom_audience_generator }
  end

  describe '#create' do
    before do
      allow(custom_audience_generator).to receive(:create)
    end

    it 'saves profile report' do
      subject.create
      profile_report.reload.id
      expect(profile_report).to be_persisted
    end

    it 'saves custom audience to facebook' do
      expect(custom_audience_generator).to receive(:create)
      subject.create
    end

    it 'enqueues jobs' do
      subject.create
      profile_report.reload
      expect(FacebookCustomAudienceWorker).to have_enqueued_sidekiq_job(profile_report.id, ad_account_id)
      expect(FullContactImportWorker).to have_enqueued_sidekiq_job(profile_report.id)
    end

    it 'returns successful result' do
      expect(subject.create.created?).to be true
    end

    context 'when profile report is invalid' do
      let(:profile_report) { build(:profile_report, title: nil) }

      it 'returns failed result' do
        result = subject.create
        expect(result.created?).to be false
        expect(result.error_messages).to be_present
      end
    end
  end
end
