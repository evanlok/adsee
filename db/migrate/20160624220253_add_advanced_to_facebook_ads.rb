class AddAdvancedToFacebookAds < ActiveRecord::Migration
  def change
    add_column :facebook_ads, :advanced, :boolean, default: false
  end
end
