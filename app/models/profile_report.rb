class ProfileReport < ActiveRecord::Base
  FileDownloadError = Class.new(StandardError)

  # Associations
  belongs_to :user

  # Validations
  validates :title, :user, :file_path, presence: true

  enum status: { draft: 0, uploaded: 1, processing: 2, processed: 3 }

  def file_url
    "#{ENV['CDN_URL']}/#{file_path}" unless file_path.blank?
  end

  def open_file
    raise 'No report file available' unless file_url
    file = FileDownloader.new(URI.encode(file_url)).save_to_temp_file
    yield file
  ensure
    file.close! if file
  end

  def emails_in_batches(batch_size = 1000)
    emails = []

    open_file do |file|
      # Check if first line is a header or row
      first_line = file.readline
      emails << first_line.strip.downcase if first_line.include?('@')

      until file.eof?
        line = file.readline
        next if line.blank?
        emails << line.strip.downcase

        if emails.length == batch_size
          yield emails
          emails = []
        end
      end

      yield emails
    end
  end
end
