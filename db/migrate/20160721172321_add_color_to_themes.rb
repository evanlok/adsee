class AddColorToThemes < ActiveRecord::Migration
  def change
    add_column :themes, :color, :string
  end
end
