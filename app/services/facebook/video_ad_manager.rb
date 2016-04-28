module Facebook
  class VideoAdManager
    attr_reader :facebook_ad

    def initialize(facebook_ad)
      @facebook_ad = facebook_ad
      @scene_collection = facebook_ad.scene_collection
      @access_token = @scene_collection.user.facebook_oauth_token
    end

    def run
      facebook_ad.publishing!
      ad = post_ad_to_facebook
      facebook_ad.update(facebook_ad_id: ad['id'], status: :published)
      true
    rescue StandardError => e
      facebook_ad.failed!
      raise e
    end

    def post_ad_to_facebook
      campaign = find_or_create_campaign
      ad_set = create_ad_set(campaign['id'])
      video_id = client.upload_video(@scene_collection.video.url)['id']
      Facebook::VideoStatusPoller.new(video_id, @access_token).wait_for_video
      ad_creative = create_ad_creative(video_id)
      create_ad(ad_set['id'], ad_creative['id'])
    end

    def find_or_create_campaign
      campaign = client.campaigns.find { |c| c['name'] == facebook_ad.campaign_name }
      return campaign if campaign

      client.create_campaign(facebook_ad.campaign_params)
    end

    def create_ad_set(campaign_id)
      client.create_ad_set(facebook_ad.ad_set_params(campaign_id))
    end

    def create_ad_creative(video_id)
      client.create_ad_creative(facebook_ad.ad_creative_params(video_id))
    end

    def create_ad(ad_set_id, ad_creative_id)
      client.create_ad(ad_set_id, ad_creative_id, status: 'ACTIVE', name: "AdSee - #{@scene_collection.id}")
    end

    private

    def client
      @client ||= Facebook::MarketingAPIClient.new(@access_token, facebook_ad.ad_account_id)
    end
  end
end
