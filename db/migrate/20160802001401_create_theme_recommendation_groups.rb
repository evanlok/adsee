class CreateThemeRecommendationGroups < ActiveRecord::Migration
  def up
    create_table :theme_recommendation_groups, force: true do |t|
      t.belongs_to :ad_type
      t.belongs_to :facebook_targeting_spec
      t.string :title
      t.text :description

      t.timestamps null: false
    end

    add_index :theme_recommendation_groups, [:ad_type_id, :facebook_targeting_spec_id], unique: true, name: 'index_ad_type_and_targeting_spec'

    ThemeRecommendation.find_each do |theme_recommendation|
      ThemeRecommendationGroup.create(ad_type_id: theme_recommendation.ad_type_id, facebook_targeting_spec_id: theme_recommendation.facebook_targeting_spec_id)
    end
  end

  def down
    drop_table :theme_recommendation_groups
  end
end
