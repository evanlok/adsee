class VideoClip < ActiveRecord::Base
  # Associations
  belongs_to :user

  # Validations
  validates :original_path, presence: true

  def base_dir
    "video_clips/#{id}"
  end

  def original_url
    "#{ENV['CDN_URL']}/#{original_path}"
  end

  def url
    "#{ENV['CDN_URL']}/#{path}"
  end
end
