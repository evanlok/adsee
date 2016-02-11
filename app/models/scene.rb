class Scene < ActiveRecord::Base
  acts_as_taggable

  # Validations
  validates :name, presence: true
end
