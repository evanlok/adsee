class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name
      t.text :url

      t.timestamps null: false
    end
  end
end
