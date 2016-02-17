class CreateThemeScenes < ActiveRecord::Migration
  def up
    create_table :theme_scenes do |t|
      t.belongs_to :theme, null: false
      t.belongs_to :scene, null: false
      t.integer :position

      t.timestamps null: false
    end

    add_index :theme_scenes, [:theme_id, :scene_id]
  end

  def down
    drop_table :theme_scenes
  end
end
