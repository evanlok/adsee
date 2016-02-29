class AdType < ActiveRecord::Base
  mount_uploader :image, ThumbnailUploader

  # Associations
  belongs_to :industry
  has_many :scene_collections, dependent: :nullify

  # Validations
  validates :name, :image, presence: true

  def as_json(options={})
    super({ only: [:id, :name, :image_url] })
  end
end
