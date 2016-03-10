class Scene < ActiveRecord::Base
  acts_as_taggable
  mount_uploader :thumbnail, ThumbnailUploader
  mount_uploader :preview_video, FileUploader

  # Associations
  has_many :theme_variant_scenes, dependent: :destroy
  has_many :theme_variants, through: :theme_variant_scenes
  has_many :scene_contents, dependent: :destroy
  has_many :scene_collections, through: :scene_contents

  # Validations
  validates :name, presence: true

  def attribute_names
    data_attributes.map { |attr| attr['name'] }
  end
end
