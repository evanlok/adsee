class AddAdTypeIdToThemes < ActiveRecord::Migration
  def change
    add_column :themes, :ad_type_id, :integer
    add_index :themes, :ad_type_id
  end
end
