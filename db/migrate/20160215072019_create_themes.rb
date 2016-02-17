class CreateThemes < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :name
      t.text :description
      t.integer :duration
      t.integer :photo_count
      t.belongs_to :song, index: true
      t.text :sample_video
      t.text :poster_image
      t.text :thumbnail

      t.timestamps null: false
    end
  end
end
