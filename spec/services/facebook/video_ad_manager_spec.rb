require 'rails_helper'

RSpec.describe Facebook::VideoAdManager do
  let(:facebook_ad) { create(:facebook_ad) }
  let(:client) { double(:client) }
  let(:manager) { described_class.new(facebook_ad) }

  before do
    allow(manager).to receive(:client) { client }
  end

  describe '#run' do
    it 'posts ad and updates record' do
      expect(manager).to receive(:post_ad_to_facebook) { { id: 500 }.stringify_keys }
      manager.run
      facebook_ad.reload
      expect(facebook_ad.facebook_ad_id).to eq('500')
      expect(facebook_ad.published?).to be true
    end

    context 'on failure' do
      it 'raises exception and updates FacebookAd status' do
        expect(manager).to receive(:post_ad_to_facebook).and_raise(StandardError)
        expect { manager.run }.to raise_error(StandardError)
        facebook_ad.reload
        expect(facebook_ad.failed?).to be true
      end
    end
  end

  describe '#post_ad_to_facebook' do
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
      expect(manager.post_ad_to_facebook).to eq({ id: 500 }.stringify_keys)
    end
  end
end
