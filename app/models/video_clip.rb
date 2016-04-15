class VideoClip < ActiveRecord::Base
  # Associations
  belongs_to :user

  # Validations
  validates :user_id, :original_path, presence: true

  def path
    original_path
  end

  def url
    "#{ENV['CDN_URL']}/#{path}"
  end
end
