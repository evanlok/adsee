class CreateSceneContents < ActiveRecord::Migration
  def up
    create_table :scene_contents do |t|
      t.belongs_to :scene, null: false
      t.belongs_to :scene_collection, null: false
      t.integer :position
      t.string :transition
      t.float :transition_duration, default: 0

      t.timestamps null: false
    end

    add_index :scene_contents, [:scene_collection_id, :scene_id]
  end

  def down
    drop_table :scene_contents
  end
end
