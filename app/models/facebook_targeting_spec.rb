class FacebookTargetingSpec < ActiveRecord::Base
  mount_uploader :thumbnail, ThumbnailUploader

  # Associations
  has_many :facebook_ads, dependent: :nullify
  has_many :scene_collection_facebook_targeting_specs, dependent: :destroy
  has_many :scene_collections, through: :scene_collection_facebook_targeting_specs
  has_many :theme_recommendation_groups, dependent: :destroy

  # Validations
  validates :name, :data, presence: true
end
