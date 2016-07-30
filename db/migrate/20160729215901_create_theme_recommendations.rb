class CreateThemeRecommendations < ActiveRecord::Migration
  def up
    create_table :theme_recommendations do |t|
      t.belongs_to :ad_type
      t.belongs_to :facebook_targeting_spec
      t.belongs_to :theme

      t.timestamps null: false
    end

    add_index :theme_recommendations, [:ad_type_id, :facebook_targeting_spec_id, :theme_id], unique: true, name: 'index_recommendation'
  end

  def down
    drop_table :theme_recommendations
  end
end
