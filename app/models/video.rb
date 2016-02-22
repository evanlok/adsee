class Video < ActiveRecord::Base
  # Associations
  belongs_to :scene_collection

  # Validations
  validates :scene_collection, presence: true
end
