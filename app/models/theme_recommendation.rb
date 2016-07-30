class ThemeRecommendation < ActiveRecord::Base
  # Associations
  belongs_to :ad_type
  belongs_to :facebook_targeting_spec
  belongs_to :theme

  # Validations
  validates :ad_type, :facebook_targeting_spec, :theme, presence: true
  validates :theme_id, uniqueness: { scope: [:ad_type_id, :facebook_targeting_spec_id] }
end
