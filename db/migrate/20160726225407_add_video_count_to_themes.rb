class AddVideoCountToThemes < ActiveRecord::Migration
  def change
    add_column :themes, :video_count, :integer
  end
end
