class ThemeRecommendation < ActiveRecord::Base
  # Associations
  belongs_to :theme_recommendation_group
  belongs_to :theme

  # Validations
  validates :theme_recommendation_group, :theme, presence: true
  validates :theme_id, uniqueness: { scope: :theme_recommendation_group_id }

  delegate :ad_type, :facebook_targeting_spec, to: :theme_recommendation_group
end
