class AddDurationAndPathToVideoClips < ActiveRecord::Migration
  def change
    add_column :video_clips, :path, :text
    add_column :video_clips, :duration, :integer
  end
end
