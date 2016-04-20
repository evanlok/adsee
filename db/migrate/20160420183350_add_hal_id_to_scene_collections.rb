class AddHalIdToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :hal_id, :string
    add_index :scene_collections, :hal_id
  end
end
