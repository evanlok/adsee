class RenameThemeScenesToThemeVariantScenes < ActiveRecord::Migration
  def change
    rename_table :theme_scenes, :theme_variant_scenes
    rename_column :theme_variant_scenes, :theme_id, :theme_variant_id
  end
end
