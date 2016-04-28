class SceneCollection < ActiveRecord::Base
  # Associations
  belongs_to :user
  belongs_to :song
  belongs_to :font
  belongs_to :ad_type
  belongs_to :theme
  has_many :videos, dependent: :destroy
  has_many :scene_contents, -> { order(:position) }, dependent: :destroy, inverse_of: :scene_collection
  has_many :scenes, through: :scene_contents
  has_many :video_jobs, dependent: :delete_all
  has_many :facebook_ads, dependent: :destroy

  # Validations
  validates :user, presence: true

  def valid_scene_contents?
    scene_contents.includes(:scene_attributes, :scene).all? do |scene_content|
      scene_content.valid? && scene_content.valid_attributes?
    end
  end

  def create_scene_contents_from_theme
    return unless theme

    self.font = theme.font
    self.song = theme.song

    theme.theme_variants.default.scenes.map do |scene|
      scene_contents.create(scene: scene)
    end

    save
  end

  def video
    if videos.loaded?
      videos.sort_by(&:resolution).last
    else
      videos.order(:resolution).last
    end
  end

  def current_facebook_ad
    @current_facebook_ad ||= facebook_ads.unpublished.order(:id).last || facebook_ads.create
  end
end
