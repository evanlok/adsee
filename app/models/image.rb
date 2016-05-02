class Image < ActiveRecord::Base
  # Associations
  belongs_to :user

  # Validations
  validates :original_path, presence: true

  def original_url
    "#{ENV['CDN_URL']}/#{original_path}"
  end

  def thumbnail_url
    "#{ENV['CDN_URL']}/#{thumbnail_path}"
  end

  def url
    "#{ENV['CDN_URL']}/#{path}"
  end
end
