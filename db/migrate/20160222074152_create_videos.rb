class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.belongs_to :scene_collection, index: true
      t.text :url
      t.string :resolution
      t.integer :duration
      t.text :thumbnail_url

      t.timestamps null: false
    end
  end
end
