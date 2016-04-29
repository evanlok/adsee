class UsersController < ApplicationController
  def facebook_data
    client = Facebook::UserDataClient.for_user(current_user)
    pages = Concurrent::Promise.execute { client.pages }
    ad_accounts = Concurrent::Promise.execute { client.ad_accounts }

    render json: { pages: pages.value, ad_accounts: ad_accounts.value }
  end
end
