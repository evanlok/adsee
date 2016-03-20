class SceneCollection < ActiveRecord::Base
  # Associations
  belongs_to :user
  belongs_to :song
  belongs_to :ad_type
  belongs_to :theme
  has_many :videos, dependent: :destroy
  has_many :scene_contents, -> { order(:position) }, dependent: :destroy, inverse_of: :scene_collection
  has_many :scenes, through: :scene_contents

  # Validations
  validates :user, presence: true

  def valid_scene_contents?
    scene_contents.includes(:scene_attributes, :scene).all? do |scene_content|
      scene_content.valid? && scene_content.valid_attributes?
    end
  end

  def create_scene_contents_from_theme
    return unless theme

    theme.theme_variants.default.scenes.map do |scene|
      scene_contents.create(scene: scene)
    end
  end
end
