class Theme < ActiveRecord::Base
  mount_uploader :thumbnail, ThumbnailUploader
  mount_uploader :poster_image, ImageUploader
  mount_uploader :sample_video, FileUploader

  # Associations
  belongs_to :song
  has_many :theme_variants, dependent: :destroy

  # Validations
  validates :name, presence: true
end
