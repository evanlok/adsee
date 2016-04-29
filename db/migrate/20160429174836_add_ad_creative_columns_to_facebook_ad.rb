class AddAdCreativeColumnsToFacebookAd < ActiveRecord::Migration
  def change
    add_column :facebook_ads, :title, :string
    add_column :facebook_ads, :description, :text
    add_column :facebook_ads, :image_url, :text
    add_column :facebook_ads, :call_to_action_type, :string
    add_column :facebook_ads, :call_to_action_link, :string
    add_column :facebook_ads, :call_to_action_link_caption, :string
  end
end
