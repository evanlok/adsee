class Profile < ActiveRecord::Base
  # Validations
  validates :email, :data, presence: true
end
