require 'rails_helper'

RSpec.describe FullContactImportWorker do
  let(:report) { create(:profile_report) }
  let(:emails) { Faker::Internet.email }
  subject { FullContactImportWorker.new }

  describe '#perform' do
    before do
      expect_any_instance_of(ProfileReport).to receive(:emails_in_batches).and_yield(emails)
    end

    it 'imports emails from full contact' do
      expect_any_instance_of(Profiles::FullContactImporter).to receive(:import).with(emails)
      subject.perform(report.id)
    end

    it 'queues report generation job' do
      allow_any_instance_of(Profiles::FullContactImporter).to receive(:import)
      subject.perform(report.id)
      expect(ProfileAnalysisReportWorker).to have_enqueued_sidekiq_job(report.id)
    end
  end
end
