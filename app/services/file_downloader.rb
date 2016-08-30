require 'securerandom'

class FileDownloader
  FileDownloadError = Class.new(StandardError)

  attr_reader :url

  def initialize(url)
    @url = url
  end

  def save_to_temp_file(directory = Rails.root.join('tmp'))
    file = Tempfile.new(SecureRandom.uuid, directory)
    file.binmode

    request = Typhoeus::Request.new(url)
    request.on_body { |chunk| file.write(chunk) }
    handle_response(request) { file.rewind }
    request.run
    file
  end

  private

  def handle_response(request)
    request.on_complete do |response|
      if response.success?
        yield response
      elsif response.timed_out?
        raise FileDownloadError, 'Report download timed out'
      elsif response.code.zero?
        raise FileDownloadError, 'Report download did not receive a response'
      else
        raise FileDownloadError, "Response returned status #{response.code}: #{response.status_message}"
      end
    end
  end
end
