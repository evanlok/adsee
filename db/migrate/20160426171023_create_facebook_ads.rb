class CreateFacebookAds < ActiveRecord::Migration
  def change
    create_table :facebook_ads do |t|
      t.belongs_to :scene_collection
      t.string :ad_account_id
      t.string :page_id
      t.string :facebook_ad_id
      t.string :campaign_name
      t.string :ad_set_name
      t.string :optimization_goal
      t.string :billing_event
      t.string :budget_type
      t.integer :budget
      t.integer :bid_amount
      t.datetime :start_time
      t.datetime :end_time
      t.string :pacing_type
      t.jsonb :adset_schedule
      t.jsonb :targeting
      t.belongs_to :facebook_targeting_spec

      t.timestamps null: false
    end
  end
end
