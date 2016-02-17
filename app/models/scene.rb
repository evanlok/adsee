class Scene < ActiveRecord::Base
  acts_as_taggable

  # Associations
  has_many :theme_scenes, dependent: :destroy
  has_many :themes, through: :theme_scenes

  # Validations
  validates :name, presence: true
end
