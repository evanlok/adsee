class ThemeScene < ActiveRecord::Base
  acts_as_list scope: :theme_id

  # Associations
  belongs_to :theme
  belongs_to :scene
end
