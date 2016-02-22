class CreateSceneAttributes < ActiveRecord::Migration
  def change
    create_table :scene_attributes do |t|
      t.belongs_to :scene_content, index: true
      t.string :type
      t.string :name
      t.text :value

      t.timestamps null: false
    end
  end
end
