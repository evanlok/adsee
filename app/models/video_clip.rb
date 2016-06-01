class VideoClip < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search, against: [:title, :filename],
                  using: {
                    tsearch: { prefix: true, dictionary: 'english' }
                  }

  # Associations
  belongs_to :user

  # Validations
  validates :original_path, presence: true

  def base_dir
    "video_clips/#{id}"
  end

  def original_url
    "#{ENV['CDN_URL']}/#{original_path}" if original_path
  end

  def url
    "#{ENV['CDN_URL']}/#{path}" if path
  end
end
