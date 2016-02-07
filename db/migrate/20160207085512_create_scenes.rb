class CreateScenes < ActiveRecord::Migration
  def change
    create_table :scenes do |t|
      t.string :name
      t.json :data_attributes
      t.string :hal_id, index: true

      t.timestamps null: false
    end
  end
end
