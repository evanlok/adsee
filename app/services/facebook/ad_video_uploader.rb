module Facebook
  class AdVideoUploader
    FailedUploadException = Class.new(StandardError)

    GRAPH_VIDEO_API_BASE = 'https://graph-video.facebook.com'.freeze

    attr_reader :ad_account_id

    def initialize(ad_account_id, access_token)
      @ad_account_id = ad_account_id
      @access_token = access_token
    end

    def upload_from_url(video_url)
      file = FileDownloader.new(video_url).save_to_temp_file

      begin
        upload(file)
      rescue FailedUploadException
        raise FailedUploadException, "Failed to upload video from #{video_url}"
      end
    end

    def upload(file)
      response = graph_video_client.post(
        advideos_path,
        upload_phase: 'start',
        file_size: file.size,
        access_token: @access_token
      )

      start_response = response.body
      video_id = start_response['video_id']
      upload_session_id = start_response['upload_session_id']
      start_offset = start_response['start_offset'].to_i
      end_offset = start_response['end_offset'].to_i

      while start_offset < end_offset
        byte_length = end_offset - start_offset
        file_chunk = StringIO.new(file.read(byte_length), 'rb')

        response = graph_video_client.post(
          advideos_path,
          upload_phase: 'transfer',
          upload_session_id: upload_session_id,
          start_offset: start_offset,
          video_file_chunk: Faraday::UploadIO.new(file_chunk, 'video/mp4'),
          access_token: @access_token
        )

        transfer_response = response.body
        start_offset = transfer_response['start_offset'].to_i
        end_offset = transfer_response['end_offset'].to_i
      end

      finish_response = graph_video_client.post(
        advideos_path,
        upload_phase: 'finish',
        upload_session_id: upload_session_id,
        access_token: @access_token
      )

      raise FailedUploadException, "Video upload for #{file.path} failed" unless finish_response.body['success']
      { id: video_id }.with_indifferent_access
    ensure
      file.close
      file.unlink if file.respond_to?(:unlink)
    end

    private

    def advideos_path
      "/#{ENV['FACEBOOK_API_VERSION']}/#{ad_account_id}/advideos"
    end

    def graph_video_client
      @graph_video_client ||= Faraday.new(url: GRAPH_VIDEO_API_BASE, request: { timeout: 15 }) do |conn|
        conn.request :multipart
        conn.request :url_encoded
        conn.request :retry
        conn.response :json
        conn.response :raise_error
        conn.adapter :net_http
      end
    end
  end
end
