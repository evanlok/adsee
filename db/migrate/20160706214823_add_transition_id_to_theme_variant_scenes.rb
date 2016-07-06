class AddTransitionIdToThemeVariantScenes < ActiveRecord::Migration
  def change
    add_column :theme_variant_scenes, :transition_id, :integer
  end
end
