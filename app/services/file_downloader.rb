require 'securerandom'

class FileDownloader
  attr_reader :url

  def initialize(url)
    @url = url
  end

  def save_to_temp_file(directory = Rails.root.join('tmp'))
    file = Tempfile.new(SecureRandom.uuid, directory)
    file.binmode

    request = Typhoeus::Request.new(url)

    request.on_headers do |response|
      raise "#{url} could not be downloaded" unless response.code == 200
    end

    request.on_body { |chunk| file.write(chunk) }
    request.on_complete { |_response| file.rewind }
    request.run
    file
  end
end
