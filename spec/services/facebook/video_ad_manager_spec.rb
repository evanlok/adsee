require 'rails_helper'

RSpec.describe Facebook::VideoAdManager do
  let(:facebook_ad) { create(:facebook_ad) }
  let(:client) { double(:client) }
  let(:manager) { described_class.new(facebook_ad) }

  before do
    allow(manager).to receive(:client) { client }
  end

  describe '#run' do
    before do
      allow(facebook_ad.scene_collection).to receive(:video) { double(:video, url: 'url') }
    end

    it 'creates campaign, ad set, ad creative, and ad' do
      expect(manager).to receive(:find_or_create_campaign) { { id: 100 }.stringify_keys }
      expect(manager).to receive(:create_ad_set).with(100) { { id: 200 }.stringify_keys }
      expect(client).to receive(:upload_video) { { id: 300 }.stringify_keys }
      expect_any_instance_of(Facebook::VideoStatusPoller).to receive(:wait_for_video)
      expect(manager).to receive(:create_ad_creative).with(300) { { id: 400 }.stringify_keys }
      expect(manager).to receive(:create_ad).with(200, 400) { { id: 500 }.stringify_keys }
      manager.run
      expect(facebook_ad.reload.facebook_ad_id).to eq('500')
    end
  end
end
