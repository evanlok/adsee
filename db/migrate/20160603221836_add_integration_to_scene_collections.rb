class AddIntegrationToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :integration, :string
    add_column :scene_collections, :integration_data, :jsonb
  end
end
