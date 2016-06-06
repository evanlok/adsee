class AddIntegrationToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :integration, :string
    add_column :scene_collections, :integration_data, :jsonb

    SceneCollection.update_all(integration: 'facebook_ad')
  end
end
