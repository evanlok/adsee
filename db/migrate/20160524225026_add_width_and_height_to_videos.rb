class AddWidthAndHeightToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :width, :integer
    add_column :videos, :height, :integer

    Video.reset_column_information
    Video.update_all('height = cast(resolution as integer)')
    Video.update_all('width = cast(resolution as integer) * 16 / 9')
  end
end
