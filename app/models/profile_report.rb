class ProfileReport < ActiveRecord::Base
  # Associations
  belongs_to :user

  # Validations
  validates :title, :user, presence: true

  enum status: { draft: 0, uploaded: 1, processing: 2, processed: 3 }

  def file_url
    "#{ENV['CDN_URL']}/#{file_path}" if file_path
  end
end
