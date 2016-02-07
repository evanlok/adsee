module HAL
  class Client
    def scenes(params = {})
      http_client.get('/api/v1/scenes', params).body
    end

    private

    def http_client
      @http_client ||= Faraday.new(ENV['HAL_URL'], headers: { 'Content-Type' => 'application/json' }) do |f|
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
