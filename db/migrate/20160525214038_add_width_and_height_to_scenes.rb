class AddWidthAndHeightToScenes < ActiveRecord::Migration
  def change
    add_column :scenes, :width, :integer
    add_column :scenes, :height, :integer
    add_index :scenes, :height
  end
end
