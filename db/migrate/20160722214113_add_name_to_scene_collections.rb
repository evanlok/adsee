class AddNameToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :name, :string
  end
end
