class VideoJob < ActiveRecord::Base
  # Associations
  belongs_to :scene_collection

  # Validations
  validates :scene_collection_id, presence: true
end
