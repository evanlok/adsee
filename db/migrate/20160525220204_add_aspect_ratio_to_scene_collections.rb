class AddAspectRatioToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :aspect_ratio, :string, default: '16:9'
  end
end
