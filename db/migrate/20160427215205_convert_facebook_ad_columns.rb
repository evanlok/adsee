class ConvertFacebookAdColumns < ActiveRecord::Migration
  def up
    change_column :facebook_ads, :budget, :decimal
    change_column :facebook_ads, :bid_amount, :decimal

    FacebookAd.update_all('budget = budget / 100')
    FacebookAd.update_all('bid_amount = bid_amount / 100')
  end

  def down
    change_column :facebook_ads, :budget, :integer
    change_column :facebook_ads, :bid_amount, :integer

    FacebookAd.update_all('budget = budget * 100')
    FacebookAd.update_all('bid_amount = bid_amount * 100')
  end
end
