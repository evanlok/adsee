class Scene < ActiveRecord::Base
  acts_as_taggable
  mount_uploader :thumbnail, ThumbnailUploader
  mount_uploader :preview_video, FileUploader

  # Associations
  has_many :theme_scenes, dependent: :destroy
  has_many :themes, through: :theme_scenes

  # Validations
  validates :name, presence: true
end
