class Theme < ActiveRecord::Base
  mount_uploader :thumbnail, ThumbnailUploader
  mount_uploader :poster_image, ImageUploader
  mount_uploader :sample_video, FileUploader

  # Associations
  belongs_to :song
  belongs_to :ad_type
  belongs_to :font
  has_many :theme_variants, dependent: :destroy do
    def default
      first
    end
  end
  has_many :theme_recommendations, dependent: :delete_all

  # Validations
  validates :name, :ad_type, presence: true

  # Scopes
  scope :featured, -> { where(featured: true) }
end
