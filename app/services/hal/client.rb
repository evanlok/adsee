module HAL
  class Client
    def scenes(params = {})
      http_client.get('scenes', params).body
    end

    def create_scene_collection(params)
      http_client.post('scene_collections', params).body
    end

    def update_scene_collection(id, params)
      http_client.patch("scene_collections/#{id}", params).body
    end

    private

    def http_client
      @http_client ||= Faraday.new("#{ENV['HAL_URL']}/api/v1", headers: { 'Content-Type' => 'application/json' }) do |f|
        f.request :json
        f.request :retry
        f.response :logger, Rails.logger
        f.response :raise_error
        f.response :json
        f.adapter Faraday.default_adapter
      end
    end
  end
end
