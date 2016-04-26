require 'rails_helper'

RSpec.describe FacebookAd do
  let(:facebook_ad) { build(:facebook_ad) }

  describe '#campaign_params' do
    subject { facebook_ad.campaign_params }

    it 'returns hash with params' do
      expect(subject).to include(:name, :objective, :status)
    end

    it 'sets name' do
      expect(subject[:name]).to eq(facebook_ad.campaign_name)
    end

    it 'sets status to paused' do
      ClimateControl.modify(FACEBOOK_ADS_ENABLED: nil) do
        expect(subject[:status]).to eq('PAUSED')
      end
    end

    it 'sets status to active' do
      ClimateControl.modify(FACEBOOK_ADS_ENABLED: '1') do
        expect(subject[:status]).to eq('ACTIVE')
      end
    end
  end

  describe '#ad_set_params' do
    subject { facebook_ad.ad_set_params('1234') }

    it 'sets campaign_id' do
      expect(subject[:campaign_id]).to eq('1234')
    end

    it 'converts pacing_type to array' do
      expect(subject[:pacing_type]).to eq([facebook_ad.pacing_type].to_json)
    end

    it 'sets daily_budget when budget_type is daily' do
      facebook_ad.budget_type = 'daily'
      expect(subject[:daily_budget]).to eq(facebook_ad.budget)
    end

    it 'sets lifetime_budget when budget_type is lifetime' do
      facebook_ad.budget_type = 'lifetime'
      expect(subject[:lifetime_budget]).to eq(facebook_ad.budget)
    end

    it 'sets bid_amount if bid_amount is set' do
      facebook_ad.bid_amount = 400
      expect(subject[:bid_amount]).to eq(400)
      expect(subject.key?(:is_autobid)).to be false
    end

    it 'sets is_autobid when no bid_amount set' do
      facebook_ad.bid_amount = nil
      expect(subject[:is_autobid]).to be true
      expect(subject.key?(:bid_amount)).to be false
    end
  end

  describe '#ad_creative_params' do
    subject { JSON.parse(facebook_ad.ad_creative_params('123')[:object_story_spec]).deep_symbolize_keys }

    it 'sets page_id' do
      expect(subject[:page_id]).to eq(facebook_ad.page_id)
    end

    it 'sets video_id' do
      expect(subject[:video_data][:video_id]).to eq('123')
    end
  end
end
