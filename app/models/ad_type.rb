class AdType < ActiveRecord::Base
  mount_uploader :image, ThumbnailUploader

  # Associations
  belongs_to :industry
  has_many :scene_collections, dependent: :nullify
  has_many :themes, dependent: :restrict_with_error
  has_many :theme_recommendations, dependent: :delete_all

  # Validations
  validates :name, :image, presence: true
end
