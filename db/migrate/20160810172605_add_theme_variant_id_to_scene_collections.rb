class AddThemeVariantIdToSceneCollections < ActiveRecord::Migration
  def change
    add_column :scene_collections, :theme_variant_id, :integer
    add_index :scene_collections, :theme_variant_id

    themes = Theme.includes(:theme_variants).all.index_by(&:id)

    SceneCollection.where.not(theme_id: nil).find_each do |scene_collection|
      scene_collection.theme_variant_id = themes[scene_collection.theme_id].theme_variants.first.id
      scene_collection.save
    end
  end
end
