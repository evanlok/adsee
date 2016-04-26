module Facebook
  class MarketingAPIClient
    attr_reader :ad_account_id, :access_token

    def initialize(access_token, ad_account_id)
      @access_token = access_token
      @ad_account_id = ad_account_id.to_s.start_with?('act_') ? ad_account_id : "act_#{ad_account_id}"
    end

    def self.for_user(user, ad_account_id)
      new(ad_account_id, user.facebook_oauth_token)
    end

    # https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group
    def campaigns(params = {})
      params.reverse_merge!(fields: %w(id name objective))
      client.get_connections(ad_account_id, 'campaigns', params)
    end

    def create_campaign(params)
      params[:status] = 'PAUSED' unless ENV['FACEBOOK_ADS_ENABLED']
      client.put_connections(ad_account_id, 'campaigns', params)
    end

    # https://developers.facebook.com/docs/marketing-api/reference/ad-campaign
    def create_ad_set(params)
      client.put_connections(ad_account_id, 'adsets', params)
    end

    # https://developers.facebook.com/docs/marketing-api/adgroup
    def create_ad(ad_set_id, ad_creative_id, params = {})
      params[:adset_id] = ad_set_id
      params[:creative] = { creative_id: ad_creative_id }.to_json
      client.put_connections(ad_account_id, 'ads', params)
    end

    # https://developers.facebook.com/docs/marketing-api/adgroup
    def create_ads_asynchronous(ad_set_id, adgroup_specs, params = {})
      adgroup_specs.each { |adgroup| adgroup.merge!(campaign_id: ad_set_id) }
      params[:adgroup_specs] = adgroup_specs
      client.put_connections(ad_account_id, 'asyncadgrouprequestsets', adgroup_specs)
    end

    # https://developers.facebook.com/docs/marketing-api/adcreative
    def create_ad_creative(params)
      client.put_connections(ad_account_id, 'adcreatives', params)
    end

    def create_video_ad_creative(page_id, video_data)
      object_story_spec = { page_id: page_id, video_data: video_data }.to_json
      create_ad_creative(object_story_spec: object_story_spec)
    end

    # https://developers.facebook.com/docs/marketing-api/advideo
    def ad_videos
      fields = %w(id from length status picture source created_time updated_time)
      client.get_connections(ad_account_id, 'advideos', fields: fields)
    end

    def ad_video(id)
      fields = %w(id from length status picture source created_time updated_time)
      client.get_connections(ad_account_id, "advideos/#{id}", fields: fields)
    end

    def create_ad_video(params)
      client.put_connections(ad_account_id, 'advideos', params)
    end

    def upload_video(video_or_url)
      uploader = Facebook::AdVideoUploader.new(ad_account_id, @access_token)

      case video_or_url
      when File
        uploader.upload(video_or_url)
      when String
        uploader.upload_from_url(video_or_url)
      else
        raise ArgumentError, 'video_or_url must be a File or String'
      end
    end

    private

    def client
      Koala::Facebook::API.new(@access_token)
    end
  end
end
