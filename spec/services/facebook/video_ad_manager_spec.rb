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
      expect(manager).to receive(:post_ad_to_facebook)
      manager.run
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
      expect(manager).to receive(:create_ad_set).with('100') { { id: 200 }.stringify_keys }
      expect(manager).to receive(:upload_video) { { id: 300 }.stringify_keys }
      expect_any_instance_of(Facebook::VideoStatusPoller).to receive(:wait_for_video)
      expect(manager).to receive(:create_ad_creative).with('300') { { id: 400 }.stringify_keys }
      expect(manager).to receive(:create_ad).with('200', '400') { { id: 500 }.stringify_keys }
      manager.post_ad_to_facebook
      expect(facebook_ad.reload)
        .to have_attributes(facebook_campaign_id: '100',
                            facebook_ad_set_id: '200',
                            facebook_video_id: '300',
                            facebook_ad_creative_id: '400',
                            facebook_ad_id: '500')
    end

    context 'when some steps have already been completed' do
      before do
        allow(manager).to receive(:find_or_create_campaign) { { 'id' => 100 } }
        allow(manager).to receive(:create_ad_set) { { 'id' => 200 } }
        allow(manager).to receive(:upload_video) { { 'id' => 300 } }
        allow_any_instance_of(Facebook::VideoStatusPoller).to receive(:wait_for_video)
        allow(manager).to receive(:create_ad_creative) { { 'id' => 400 } }
        allow(manager).to receive(:create_ad) { { 'id' => 500 } }
      end

      context 'when ad set has already been created' do
        before { facebook_ad.facebook_ad_set_id = '200' }

        it 'skips step' do
          expect(manager).to_not receive(:create_ad_set)
          manager.post_ad_to_facebook
        end
      end

      context 'when ad video has already been created' do
        before { facebook_ad.facebook_video_id = '300' }

        it 'skips step' do
          expect(manager).to_not receive(:upload_video)
          manager.post_ad_to_facebook
        end
      end

      context 'when ad creative has already been created' do
        before { facebook_ad.facebook_ad_creative_id = '400' }

        it 'skips step' do
          expect(manager).to_not receive(:create_ad_creative)
          manager.post_ad_to_facebook
        end
      end

      context 'when ad creative has already been created' do
        before { facebook_ad.facebook_ad_id = '500' }

        it 'skips step' do
          expect(manager).to_not receive(:create_ad)
          manager.post_ad_to_facebook
        end
      end
    end
  end

  describe '#find_or_create_campaign' do
    let(:campaign) { { 'id' => 100 } }

    it 'creates new campaign' do
      expect(client).to receive(:campaigns) { [] }
      expect(client).to receive(:create_campaign) { campaign }
      expect(manager.find_or_create_campaign).to eq(campaign)
    end

    context 'when campaign already exists' do
      let(:campaign) { { 'id' => 111, 'name' => facebook_ad.campaign_name } }

      it 'returns existing campaign' do
        expect(client).to receive(:campaigns) { [campaign] }
        expect(client).to_not receive(:create_campaign)
        expect(manager.find_or_create_campaign).to eq(campaign)
      end
    end
  end

  describe '#create_ad_set' do
    let(:ad_set) { { 'id' => 222 } }

    before do
      expect(client).to receive(:create_ad_set) { ad_set }
    end

    it 'creates ad set' do
      expect(manager.create_ad_set('1234')).to eq(ad_set)
    end
  end

  describe '#upload_video' do
    let(:video) { double(:video, url: Faker::Internet.url) }
    let(:scene_collection) { create(:scene_collection) }
    let(:facebook_ad) { create(:facebook_ad, scene_collection: scene_collection) }
    let(:facebook_video) { { 'id' => 333 } }

    before do
      allow(scene_collection).to receive(:video) { video }
      expect(client).to receive(:upload_video) { facebook_video }
    end

    it 'uploads video' do
      expect(manager.upload_video).to eq(facebook_video)
    end
  end

  describe '#create_ad_creative' do
    let(:ad_creative) { { 'id' => 444 } }

    before do
      expect(client).to receive(:create_ad_creative) { ad_creative }
    end

    it 'creates ad creative' do
      expect(manager.create_ad_creative('333')).to eq(ad_creative)
    end
  end

  describe '#create_ad' do
    let(:ad) { { 'id' => 555 } }

    before do
      expect(client).to receive(:create_ad) { ad }
    end

    it 'create ad creative' do
      expect(manager.create_ad('222', '444')).to eq(ad)
    end
  end
end
