class AdType < ActiveRecord::Base
  mount_uploader :image, ThumbnailUploader

  # Associations
  belongs_to :industry
  has_many :scene_collections, dependent: :nullify

  # Validations
  validates :name, :image, presence: true
end
