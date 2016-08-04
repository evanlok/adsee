class AddDescriptionToIndustriesAndAdTypes < ActiveRecord::Migration
  def change
    add_column :industries, :description, :text
    add_column :ad_types, :description, :text
  end
end
