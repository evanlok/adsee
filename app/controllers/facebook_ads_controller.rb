class FacebookAdsController < ApplicationController
  before_action :load_facebook_ad, only: [:show, :update]
  after_action :verify_authorized, except: :index

  def show
    respond_to do |format|
      format.json
    end
  end

  def create
    @scene_collection = SceneCollection.find(params[:scene_collection_id])
    @facebook_ad = @scene_collection.facebook_ads.where(facebook_ad_id: nil).order(:updated_at).last
    @facebook_ad ||= @scene_collection.facebook_ads.build
    authorize @facebook_ad
    @facebook_ad.attributes = facebook_ad_params

    if @facebook_ad.save
      respond_to do |format|
        format.json { render :show }
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@facebook_ad) }
      end
    end
  end

  def update
    if @facebook_ad.update(facebook_ad_params)
      respond_to do |format|
        format.json { render :show }
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@facebook_ad) }
      end
    end
  end

  private

  def facebook_ad_params
    if params[:facebook_ad]
      params.require(:facebook_ad).permit(:ad_account_id, :page_id, :campaign_name, :ad_set_name, :optimization_goal,
                                          :billing_event, :budget_type, :budget, :bid_amount, :start_time, :end_time,
                                          :pacing_type, :adset_schedule, :targeting, :facebook_targeting_spec_id)
    else
      {}
    end
  end

  def load_facebook_ad
    @facebook_ad = FacebookAd.find(params[:id])
    authorize @facebook_ad
  end
end
