class RemoveDurationFromThemes < ActiveRecord::Migration
  def change
    remove_column :themes, :duration
  end
end
