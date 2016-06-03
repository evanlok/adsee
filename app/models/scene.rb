class Scene < ActiveRecord::Base
  ASPECT_RATIOS = {
    '1:1' => [720, 720],
    '16:9' => [1280, 720]
  }.freeze

  acts_as_taggable
  mount_uploader :thumbnail, ThumbnailUploader
  mount_uploader :preview_video, FileUploader
  mount_uploader :guide_video, FileUploader

  # Associations
  belongs_to :scene_category
  has_many :theme_variant_scenes, dependent: :destroy
  has_many :theme_variants, through: :theme_variant_scenes
  has_many :scene_contents, dependent: :destroy
  has_many :scene_collections, through: :scene_contents

  # Validations
  validates :name, presence: true

  # Scopes
  scope :with_aspect_ratio, lambda { |aspect_ratio|
    where(width: ASPECT_RATIOS.fetch(aspect_ratio)[0], height: ASPECT_RATIOS.fetch(aspect_ratio)[1])
  }

  def attribute_names
    data_attributes.map { |attr| attr['name'] }
  end

  def aspect_ratio
    ASPECT_RATIOS.invert.fetch([width, height])
  end
end
