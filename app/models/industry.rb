class Industry < ActiveRecord::Base
  mount_uploader :image, ThumbnailUploader

  # Associations
  has_many :ad_types, dependent: :nullify

  # Validations
  validates :name, :image, presence: true
end
