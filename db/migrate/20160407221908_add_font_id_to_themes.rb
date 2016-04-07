class AddFontIdToThemes < ActiveRecord::Migration
  def change
    add_column :themes, :font_id, :integer
    add_index :themes, :font_id
  end
end
