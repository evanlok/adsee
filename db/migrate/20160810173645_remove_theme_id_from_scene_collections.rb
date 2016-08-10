class RemoveThemeIdFromSceneCollections < ActiveRecord::Migration
  def change
    remove_column :scene_collections, :theme_id
  end
end
