class FacebookAd < ActiveRecord::Base
  CAMPAIGN_NAME = 'AdSee'.freeze

  # Associations
  belongs_to :scene_collection
  belongs_to :facebook_targeting_spec

  # Validations
  validates :scene_collection_id, presence: true

  # Callbacks
  before_create :set_defaults

  def campaign_params
    {
      name: campaign_name,
      objective: 'VIDEO_VIEWS',
      status: ENV['FACEBOOK_ADS_ENABLED'] ? 'ACTIVE' : 'PAUSED'
    }
  end

  def ad_set_params(campaign_id)
    params = default_ad_set_params
    params[:campaign_id] = campaign_id

    if budget_type == 'daily'
      params[:daily_budget] = budget
    else
      params[:lifetime_budget] = budget
    end

    if bid_amount
      params[:bid_amount] = bid_amount
    else
      params[:is_autobid] = true
    end

    params
  end

  def ad_creative_params(video_id)
    {
      object_story_spec: {
        page_id: page_id,
        video_data: {
          video_id: video_id,
          title: 'Video Title',
          description: 'Video description goes here',
          image_url: 'https://s3.amazonaws.com/adsee-development/media_library/rZblyFgcQiGibwypA265_house.jpg',
          call_to_action: {
            type: 'LEARN_MORE',
            value: {
              link: 'https://www.adsee.com',
              link_caption: 'AdSee'
            }
          }
        }
      }.to_json
    }
  end

  private

  def default_ad_set_params
    params = {
      name: ad_set_name,
      optimization_goal: optimization_goal,
      billing_event: billing_event,
      start_time: start_time,
      end_time: end_time,
      targeting: facebook_targeting_spec.data.to_json
    }

    params[:pacing_type] = [pacing_type].to_json if pacing_type
    params
  end

  def set_defaults
    self.campaign_name ||= CAMPAIGN_NAME
  end
end
