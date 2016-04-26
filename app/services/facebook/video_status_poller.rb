module Facebook
  class VideoStatusPoller
    VideoEncodeTimeoutError = Class.new(StandardError)

    INTERVAL = 3
    TIMEOUT = 90
    FIELDS = %w(id status created_time updated_time).join(',').freeze

    attr_reader :video_id

    def initialize(video_id, access_token)
      @video_id = video_id
      @access_token = access_token
    end

    def wait_for_video
      ready = false
      response = {}
      path = "/#{Facebook::AdVideoUploader::FACEBOOK_API_VERSION}/#{video_id}"
      retries = 0

      until ready
        response = client.get(path, fields: FIELDS, access_token: @access_token).body
        ready = response.dig('status', 'video_status') == 'ready'
        sleep INTERVAL unless ready
        retries += 1
        raise VideoEncodeTimeoutError, "Video #{video_id} taking too long to encode" if retries * INTERVAL >= TIMEOUT
      end

      response
    end

    private

    def client
      @client ||= Faraday.new(url: Facebook::AdVideoUploader::GRAPH_VIDEO_API_BASE) do |conn|
        conn.request :multipart
        conn.request :url_encoded
        conn.request :retry
        conn.response :json
        conn.response :raise_error
        conn.adapter Faraday.default_adapter
      end
    end
  end
end
