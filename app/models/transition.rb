class Transition < ActiveRecord::Base
  mount_uploader :image, FileUploader

  # Associations
  has_many :scene_contents, dependent: :nullify
  has_many :theme_variant_scenes, dependent: :nullify

  # Validations
  validates :name, :value, presence: true
end
