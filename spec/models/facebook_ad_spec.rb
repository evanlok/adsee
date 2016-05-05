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

    it 'converts pacing_type to array when set to no_pacing and bid_amount is set' do
      facebook_ad.pacing_type = 'no_pacing'
      facebook_ad.bid_amount = 2
      expect(subject[:pacing_type]).to eq([facebook_ad.pacing_type].to_json)
    end

    it 'does not include pacing_type for standard' do
      expect(subject[:pacing_type]).to be nil
    end

    it 'does not include pacing_type when bid_amount is nil' do
      facebook_ad.pacing_type = 'no_pacing'
      facebook_ad.bid_amount = nil
      expect(subject[:pacing_type]).to be nil
    end

    it 'sets daily_budget when budget_type is daily' do
      facebook_ad.budget_type = 'daily'
      expect(subject[:daily_budget]).to eq((facebook_ad.budget * 100).to_i)
    end

    it 'sets lifetime_budget when budget_type is lifetime' do
      facebook_ad.budget_type = 'lifetime'
      expect(subject[:lifetime_budget]).to eq((facebook_ad.budget * 100).to_i)
    end

    it 'sets bid_amount if bid_amount is set' do
      facebook_ad.bid_amount = 4
      expect(subject[:bid_amount]).to eq(400)
      expect(subject.key?(:is_autobid)).to be false
    end

    it 'sets is_autobid when no bid_amount set' do
      facebook_ad.bid_amount = nil
      expect(subject[:is_autobid]).to be true
      expect(subject.key?(:bid_amount)).to be false
    end

    context 'with targeting data' do
      let(:targeting_spec) { create(:facebook_targeting_spec) }

      it 'sets targeting data' do
        facebook_ad.scene_collection.facebook_targeting_specs = [targeting_spec]
        expect(subject[:targeting]).to eq(targeting_spec.data.to_json)
      end
    end

    context 'with zip codes' do
      it 'sets geolocation data in targeting param' do
        facebook_ad.scene_collection.zip_codes = %w(94102 94107)
        expected = { geo_locations: { zips: [{ key: 'US:94102' }, { key: 'US:94107' }] } }.to_json
        expect(subject[:targeting]).to eq(expected)
      end

      context 'and a preselected bundle' do
        let(:targeting_spec) { create(:facebook_targeting_spec, data: { geo_locations: { countries: ['US'] } }) }

        it 'overrides targeting spec data' do
          facebook_ad.scene_collection.facebook_targeting_specs = [targeting_spec]
          facebook_ad.scene_collection.zip_codes = %w(94102 94107)
          expected = { geo_locations: { zips: [{ key: 'US:94102' }, { key: 'US:94107' }] } }.to_json
          expect(subject[:targeting]).to eq(expected)
        end
      end
    end

    context 'with no geolocation targeting data' do
      let(:targeting_spec) { create(:facebook_targeting_spec, data: { age_min: 18 }) }

      it 'defaults to US' do
        facebook_ad.scene_collection.facebook_targeting_specs = [targeting_spec]
        expect(subject[:targeting]).to eq({ age_min: 18, geo_locations: { countries: ['US'] } }.to_json)
      end
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
