class AddSongCategoryIdToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :song_category_id, :integer
    add_index :songs, :song_category_id
  end
end
