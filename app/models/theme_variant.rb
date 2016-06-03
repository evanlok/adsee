class ThemeVariant < ActiveRecord::Base
  # Associations
  belongs_to :theme
  belongs_to :video_type
  has_many :theme_variant_scenes, -> { order(:position) }, dependent: :destroy
  has_many :scenes, through: :theme_variant_scenes

  # Validations
  validates :theme, :video_type, presence: true

  accepts_nested_attributes_for :theme_variant_scenes,
                                reject_if: proc { |attr| attr[:scene_id].blank? },
                                allow_destroy: true

  def display_name
    "#{theme.name} - #{video_type.name}"
  end

  def aspect_ratio
    scenes.first&.aspect_ratio
  end
end
