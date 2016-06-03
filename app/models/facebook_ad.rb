class FacebookAd < ActiveRecord::Base
  CAMPAIGN_NAME = 'AdSee'.freeze

  # Associations
  belongs_to :scene_collection
  has_many :facebook_targeting_specs, through: :scene_collection

  # Validations
  validates :scene_collection_id, presence: true

  # Callbacks
  before_create :set_defaults

  enum status: { unpublished: 0, publishing: 1, published: 2, failed: 3 }

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
      params[:daily_budget] = (budget * 100).to_i
    else
      params[:lifetime_budget] = (budget * 100).to_i
    end

    if bid_amount
      params[:bid_amount] = (bid_amount * 100).to_i
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
          title: title,
          description: description,
          image_url: image_url || scene_collection.video&.thumbnail_url,
          call_to_action: {
            type: call_to_action_type,
            value: {
              link: call_to_action_link,
              link_caption: call_to_action_link_caption
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
      targeting: build_targeting_spec.to_json
    }

    if pacing_type == 'no_pacing' && bid_amount
      params[:pacing_type] = [pacing_type].to_json
    end

    params
  end

  def build_targeting_spec
    targeting_spec = facebook_targeting_specs.first&.data&.deep_symbolize_keys || {}

    if scene_collection.zip_codes.present?
      zip_json = scene_collection.zip_codes.map { |zip_code| { key: "US:#{zip_code}" } }
      geo_locations = { zips: zip_json }
      targeting_spec[:geo_locations] = geo_locations
    else
      targeting_spec[:geo_locations] = { countries: ['US'] }
    end

    targeting_spec
  end

  def set_defaults
    self.campaign_name ||= CAMPAIGN_NAME
    self.optimization_goal ||= 'VIDEO_VIEWS'
    self.billing_event ||= 'IMPRESSIONS'
    self.budget_type ||= 'daily'
    self.pacing_type ||= 'standard'
  end
end
