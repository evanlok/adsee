class ThemeVariantScene < ActiveRecord::Base
  acts_as_list scope: :theme_variant_id

  # Associations
  belongs_to :theme_variant
  belongs_to :scene
end
