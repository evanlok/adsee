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
      post_ad_to_facebook
      facebook_ad.published!
      true
    rescue StandardError => e
      facebook_ad.failed!
      raise e
    end

    # rubocop:disable MethodLength, AbcSize
    def post_ad_to_facebook
      unless facebook_ad.facebook_campaign_id
        campaign = find_or_create_campaign
        facebook_ad.update(facebook_campaign_id: campaign['id'])
      end

      unless facebook_ad.facebook_ad_set_id
        ad_set = create_ad_set(facebook_ad.facebook_campaign_id)
        facebook_ad.update(facebook_ad_set_id: ad_set['id'])
      end

      unless facebook_ad.facebook_video_id
        video = upload_video
        Facebook::VideoStatusPoller.new(video['id'], @access_token).wait_for_video
        facebook_ad.update(facebook_video_id: video['id'])
      end

      unless facebook_ad.facebook_ad_creative_id
        ad_creative = create_ad_creative(facebook_ad.facebook_video_id)
        facebook_ad.update(facebook_ad_creative_id: ad_creative['id'])
      end

      unless facebook_ad.facebook_ad_id
        ad = create_ad(facebook_ad.facebook_ad_set_id, facebook_ad.facebook_ad_creative_id)
        facebook_ad.update(facebook_ad_id: ad['id'])
      end
    end

    def find_or_create_campaign
      campaign = client.campaigns.find { |c| c['name'] == facebook_ad.campaign_name }
      campaign ||= client.create_campaign(facebook_ad.campaign_params)
      facebook_ad.update(facebook_campaign_id: campaign['id'])
      campaign
    end

    def create_ad_set(campaign_id)
      client.create_ad_set(facebook_ad.ad_set_params(campaign_id))
    end

    def upload_video
      client.upload_video(@scene_collection.video.url)
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
