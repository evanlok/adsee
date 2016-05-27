class VideoClipEncoder
  delegate :url_helpers, to: 'Rails.application.routes'
  attr_reader :video_clip

  def initialize(video_clip)
    @video_clip = video_clip
  end

  def encode
    params = {
      input_url: video_clip.original_url,
      encoding_settings: settings
    }

    client.post('/encodings', params.to_json)
  end

  def settings
    {
      reference_id: video_clip.id,
      notifications: notifications,
      outputs: outputs
    }
  end

  private

  def client
    Faraday.new(ENV['VIDGENIE_SERVER_URL'], headers: { 'Content-Type' => 'application/json' }) do |f|
      f.request :json
      f.request :retry
      f.response :logger, Rails.logger
      f.response :raise_error
      f.response :json
      f.adapter Faraday.default_adapter
    end
  end

  def base_url
    @base_url ||= "s3://#{ENV['S3_BUCKET_NAME']}/#{video_clip.base_dir}"
  end

  def outputs
    [
      {
        base_url: base_url,
        public: true,
        video_codec: 'libx264',
        format: 'mp4',
        x264_preset: 'superfast',
        label: 'high',
        filename: video_clip.filename,
        resolution: '1280x720',
        thumbnail: {
          resolution: '1280x720',
          seek_time: 1,
          base_url: base_url,
          filename: 'thumb_720.jpg'
        }
      }
    ]
  end

  def notifications
    [
      {
        url: url_helpers.video_clip_encoding_callback_url(default_url_options.merge(id: video_clip.id))
      }
    ]
  end

  def default_url_options
    { host: ENV['HOST'], port: ENV['WEB_PORT'], protocol: ENV['URI_SCHEME'] }
  end
end
