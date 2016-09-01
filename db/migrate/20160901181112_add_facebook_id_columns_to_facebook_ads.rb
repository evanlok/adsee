class AddFacebookIdColumnsToFacebookAds < ActiveRecord::Migration
  def change
    add_column :facebook_ads, :facebook_campaign_id, :string
    add_column :facebook_ads, :facebook_ad_set_id, :string
    add_column :facebook_ads, :facebook_ad_creative_id, :string
    add_column :facebook_ads, :facebook_video_id, :string
  end
end
