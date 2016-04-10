class Transition < ActiveRecord::Base
  # Associations
  has_many :scene_contents, dependent: :nullify

  # Validations
  validates :name, :value, presence: true
end
