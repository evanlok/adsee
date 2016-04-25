class SceneCategory < ActiveRecord::Base
  # Associations
  has_many :scenes, dependent: :nullify

  # Validations
  validates :name, presence: true
end
