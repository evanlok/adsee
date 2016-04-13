class Image < ActiveRecord::Base
  # Associations
  belongs_to :user

  # Validations
  validates :user_id, :original_path, presence: true
end
