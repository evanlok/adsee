class RemoveResolutionFromVideos < ActiveRecord::Migration
  def change
    remove_column :videos, :resolution
  end
end
