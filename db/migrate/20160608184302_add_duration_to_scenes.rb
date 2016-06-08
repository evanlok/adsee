class AddDurationToScenes < ActiveRecord::Migration
  def change
    add_column :scenes, :duration, :integer
  end
end
