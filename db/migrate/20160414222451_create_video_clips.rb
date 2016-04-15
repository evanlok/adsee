class CreateVideoClips < ActiveRecord::Migration
  def change
    create_table :video_clips do |t|
      t.string :filename
      t.text :original_path
      t.text :filestack_url
      t.text :thumbnail_url
      t.integer :file_size
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
