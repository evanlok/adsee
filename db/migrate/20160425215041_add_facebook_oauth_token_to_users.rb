class AddFacebookOauthTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :facebook_oauth_token, :string
    add_column :users, :facebook_oauth_expires_at, :datetime
  end
end
