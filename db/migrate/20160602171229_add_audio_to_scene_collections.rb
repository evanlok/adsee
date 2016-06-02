class AddAudioToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :audio, :text
  end
end
