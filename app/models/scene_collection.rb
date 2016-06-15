class SceneCollection < ActiveRecord::Base
  INTEGRATIONS = %w(facebook_ad facebook_post page_post).freeze

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
  has_many :scene_collection_facebook_targeting_specs, dependent: :destroy
  has_many :facebook_targeting_specs, through: :scene_collection_facebook_targeting_specs

  # Validations
  validates :user, presence: true

  # Callbacks
  after_destroy :delete_hal_record

  enum status: { draft: 0, generating: 1, generated: 2, failed: 3 }

  def valid_scene_contents?
    scene_contents.includes(:scene_attributes, :scene).all? do |scene_content|
      scene_content.valid? && scene_content.valid_attributes?
    end
  end

  def create_scene_contents_from_theme
    return unless theme

    self.font = theme.font
    self.song = theme.song
    self.aspect_ratio = theme.theme_variants.default.aspect_ratio

    theme.theme_variants.default.scenes.map do |scene|
      scene_contents.create(scene: scene)
    end

    save
  end

  def video
    if videos.loaded?
      videos.sort_by(&:height).last
    else
      videos.order(:height).last
    end
  end

  def current_facebook_ad
    @current_facebook_ad ||= begin
      if facebook_ads.loaded?
        facebook_ads.first || facebook_ads.create
      else
        facebook_ads.first_or_create
      end
    end
  end

  def audio_url
    "#{ENV['CDN_URL']}/#{audio}" if audio
  end

  private

  def delete_hal_record
    HAL::Client.new.delete_scene_collection(hal_id) if hal_id
  rescue => e
    Honeybadger.notify(e, context: { id: id, hal_id: hal_id })
  end
end
