class Industry < ActiveRecord::Base
  mount_uploader :image, ThumbnailUploader

  # Associations
  has_many :ad_types, dependent: :nullify

  # Validations
  validates :name, :image, presence: true

  def as_json(options={})
    super({ only: [:id, :name, :image_url] })
  end
end
