class Font < ActiveRecord::Base
  mount_uploader :image, FileUploader

  # Associations
  has_many :themes, dependent: :nullify
  has_many :scene_collections, dependent: :nullify

  # Validations
  validates :name, :url, presence: true
end
