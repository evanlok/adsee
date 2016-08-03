class RemoveColumnsFromThemeRecommendations < ActiveRecord::Migration
  def change
    remove_index :theme_recommendations, name: 'index_recommendation'
    remove_column :theme_recommendations, :ad_type_id
    remove_column :theme_recommendations, :facebook_targeting_spec_id
  end
end
