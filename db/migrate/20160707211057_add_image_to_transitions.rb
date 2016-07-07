class AddImageToTransitions < ActiveRecord::Migration
  def change
    add_column :transitions, :image, :text
  end
end
