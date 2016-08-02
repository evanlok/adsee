class ThemeRecommendationGroup < ActiveRecord::Base
  # Associations
  belongs_to :ad_type
  belongs_to :facebook_targeting_spec
  has_many :theme_recommendations, dependent: :destroy
  has_many :themes, through: :theme_recommendations

  # Validations
  validates :ad_type, :facebook_targeting_spec, presence: true
  validates :facebook_targeting_spec_id, uniqueness: { scope: :ad_type_id }
end
