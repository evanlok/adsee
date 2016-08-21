class ProfileReport < ActiveRecord::Base
  mount_uploader :attachment, FileUploader

  # Associations
  belongs_to :user

  # Validations
  validates :user, presence: true

  enum status: { draft: 0, uploaded: 1, processing: 2, processed: 3 }
end
