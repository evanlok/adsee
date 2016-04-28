class AddStatusToFacebookAds < ActiveRecord::Migration
  def change
    add_column :facebook_ads, :status, :integer, default: 0
  end
end
