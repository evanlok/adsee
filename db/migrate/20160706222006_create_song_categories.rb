class CreateSongCategories < ActiveRecord::Migration
  def change
    create_table :song_categories do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
