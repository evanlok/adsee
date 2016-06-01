class AddTitleToImagesAndVideoClips < ActiveRecord::Migration
  def change
    add_column :video_clips, :title, :string
    add_column :images, :title, :string
  end
end
