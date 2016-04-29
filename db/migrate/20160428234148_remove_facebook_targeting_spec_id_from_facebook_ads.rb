class RemoveFacebookTargetingSpecIdFromFacebookAds < ActiveRecord::Migration
  def change
    remove_column :facebook_ads, :facebook_targeting_spec_id
  end
end
