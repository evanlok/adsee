class CreateSceneCollectionFacebookTargetingSpecs < ActiveRecord::Migration
  def change
    create_table :scene_collection_facebook_targeting_specs do |t|
      t.belongs_to :scene_collection
      t.belongs_to :facebook_targeting_spec

      t.timestamps null: false
    end

    add_index :scene_collection_facebook_targeting_specs, [:scene_collection_id, :facebook_targeting_spec_id], unique: true, name: 'index_scene_collection_targeting'
  end
end
