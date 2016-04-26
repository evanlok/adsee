class FacebookTargetingSpec < ActiveRecord::Base
  # Associations
  has_many :facebook_ads, dependent: :nullify

  # Validations
  validates :name, :data, presence: true
end
