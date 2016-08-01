class AddFeaturedToThemes < ActiveRecord::Migration
  def change
    add_column :themes, :featured, :boolean, default: false
    add_index :themes, :featured
  end
end
