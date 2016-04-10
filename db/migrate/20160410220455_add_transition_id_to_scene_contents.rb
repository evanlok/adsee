class AddTransitionIdToSceneContents < ActiveRecord::Migration
  def change
    add_column :scene_contents, :transition_id, :integer
    remove_column :scene_contents, :transition
  end
end
