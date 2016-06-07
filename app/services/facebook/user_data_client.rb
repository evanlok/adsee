module Facebook
  class UserDataClient
    def initialize(access_token)
      @access_token = access_token
    end

    def self.for_user(user)
      new(user.facebook_oauth_token)
    end

    # https://developers.facebook.com/docs/marketing-api/adaccount
    def ad_accounts
      fields = %w(id account_id name business_name account_status capabilities)
      client.get_connections('me', 'adaccounts', fields: fields)
    end

    def pages
      client.get_connections('me', 'accounts').select { |page| page['perms'].include?('CREATE_ADS') }
    end

    def postable_pages
      client.get_connections('me', 'accounts').select { |page| page['perms'].include?('CREATE_CONTENT') }
    end

    private

    def client
      Koala::Facebook::API.new(@access_token)
    end
  end
end
