class AddConfigToSceneAttributes < ActiveRecord::Migration
  def change
    add_column :scene_attributes, :config, :jsonb
  end
end
