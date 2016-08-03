class AddThemeRecommendationGroupIdToThemeRecommendations < ActiveRecord::Migration
  def change
    add_column :theme_recommendations, :theme_recommendation_group_id, :integer
    add_index :theme_recommendations, [:theme_recommendation_group_id, :theme_id], unique: true, name: 'index_group_and_theme'
  end
end
