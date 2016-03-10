class VideoType < ActiveRecord::Base
  # Associations
  has_many :theme_variants, dependent: :nullify

  # Validations
  validates :name, presence: true
end
