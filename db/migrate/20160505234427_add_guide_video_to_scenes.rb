class AddGuideVideoToScenes < ActiveRecord::Migration
  def change
    add_column :scenes, :guide_video, :text
  end
end
