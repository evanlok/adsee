class AddStatusToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :status, :integer, default: 0
  end
end
