class ThemeVariant < ActiveRecord::Base
  mount_uploader :thumbnail, ThumbnailUploader
  mount_uploader :poster_image, ImageUploader
  mount_uploader :sample_video, FileUploader

  # Associations
  belongs_to :theme
  belongs_to :video_type
  has_many :theme_variant_scenes, -> { order(:position) }, dependent: :destroy
  has_many :scenes, through: :theme_variant_scenes

  # Validations
  validates :theme, :video_type, :aspect_ratio, presence: true
  validate :scene_aspect_ratios_match

  accepts_nested_attributes_for :theme_variant_scenes,
                                reject_if: proc { |attr| attr[:scene_id].blank? },
                                allow_destroy: true

  def display_name
    name || "#{theme.name} - #{video_type.name}"
  end

  private

  def scene_aspect_ratios_match
    return if scenes.all? { |scene| scene.aspect_ratio == aspect_ratio }
    errors.add(:scenes, 'have mixed aspect ratios')
  end
end
