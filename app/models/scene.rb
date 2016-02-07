class Scene < ActiveRecord::Base
  # Validations
  validates :name, presence: true
end
