class AddImageToFonts < ActiveRecord::Migration
  def change
    add_column :fonts, :image, :text
  end
end
