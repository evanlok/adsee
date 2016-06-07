module Facebook
  class FeedPoster
    attr_reader :scene_collection

    def initialize(scene_collection)
      @scene_collection = scene_collection
      @access_token = @scene_collection.user.facebook_oauth_token
    end

    def post_to_wall
      params = {
        file_url: video_url,
        description: scene_collection.integration_data['description']
      }

      client.put_object('me', 'videos', params)
    end

    def post_to_page
      page_id = scene_collection.integration_data['page_id']

      params = {
        file_url: video_url,
        description: scene_collection.integration_data['description']
      }

      if scene_collection.integration_data['call_to_action']
        params[:call_to_action] = scene_collection.integration_data['call_to_action'].to_json
      end

      page_client(page_id).put_object(page_id, 'videos', params)
    end

    private

    def video_url
      @video_url ||= scene_collection.video.url
    end

    def client
      Koala::Facebook::API.new(@access_token)
    end

    def page_client(page_id)
      user_data_client = Facebook::UserDataClient.new(@access_token)
      page = user_data_client.postable_pages.find { |p| p['id'] == page_id.to_s }
      raise "Insufficient permissions to post to page: #{page_id}" unless page
      Koala::Facebook::API.new(page['access_token'])
    end
  end
end
