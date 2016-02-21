class AddPreviewVideoAndThumbnailToScenes < ActiveRecord::Migration
  def change
    add_column :scenes, :thumbnail, :text
    add_column :scenes, :preview_video, :text
  end
end
