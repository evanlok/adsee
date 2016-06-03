module Facebook
  class FeedPoster
    attr_reader :scene_collection

    def initialize(scene_collection)
      @scene_collection = scene_collection
      @access_token = @scene_collection.user.facebook_oauth_token
    end

    def post_to_wall(message = '')
      client.put_object(
        'me', 'videos',
        file_url: video_url,
        description: message,
        privacy: { value: 'SELF' }.to_json
      )
    end

    def post_to_page(page_id, message = '')
      page_client(page_id).put_object(
        page_id, 'videos',
        file_url: video_url,
        description: message
      )
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
