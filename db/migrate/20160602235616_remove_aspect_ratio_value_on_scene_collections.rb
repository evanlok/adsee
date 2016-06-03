class RemoveAspectRatioValueOnSceneCollections < ActiveRecord::Migration
  def change
    change_column :scene_collections, :aspect_ratio, :string, default: nil
  end
end
