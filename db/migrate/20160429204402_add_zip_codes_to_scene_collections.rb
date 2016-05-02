class AddZipCodesToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :zip_codes, :text, array: true
  end
end
