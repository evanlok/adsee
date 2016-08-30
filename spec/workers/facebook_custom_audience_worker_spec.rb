require 'rails_helper'

RSpec.describe FacebookCustomAudienceWorker do
  let(:report) { create(:profile_report) }
  let(:ad_account_id) { 'act_12345' }
  let(:custom_audience_generator) { double(:custom_audience_generator) }
  subject { FacebookCustomAudienceWorker.new }

  describe '#perform' do
    it 'fetches report, ad_account, user then triggers methods to create audience and add users' do
      expect(subject).to receive(:custom_audience_generator) { custom_audience_generator }
      expect(custom_audience_generator).to receive(:create_and_add_users)
      subject.perform(report.id, ad_account_id)
    end
  end
end
