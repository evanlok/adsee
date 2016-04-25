class AddSceneCategoryIdToScenes < ActiveRecord::Migration
  def change
    add_column :scenes, :scene_category_id, :integer
  end
end
