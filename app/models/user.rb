class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook]

  # Associations
  has_many :scene_collections, dependent: :destroy
  has_many :images
  has_many :video_clips

  def self.from_omniauth(auth)
    user = where(email: auth.info.email).first_or_initialize do |u|
      u.email = auth.info.email
      u.password = Devise.friendly_token[0, 20]
      u.provider = auth.provider
      u.uid = auth.uid
    end

    user.facebook_oauth_token = auth.credentials.token
    user.facebook_oauth_expires_at = Time.zone.at(auth.credentials.expires_at) if auth.credentials.expires_at
    user.set_info_from_facebook
    user.save
    user
  end

  def set_info_from_facebook
    graph = Koala::Facebook::API.new(facebook_oauth_token)
    user_data = graph.get_object('me')
    self.first_name = user_data['first_name']
    self.last_name = user_data['last_name']
  end
end
