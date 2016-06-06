class SceneCollectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_scene_collection, only: [:show, :update, :summary_info]
  after_action :verify_authorized, except: [:new, :index]
  after_action :verify_policy_scoped, only: :index

  wrap_parameters include: [*SceneCollection.attribute_names, :facebook_targeting_spec_ids]

  def index
    @scene_collections = policy_scope(SceneCollection)
                           .includes(:theme, :videos, :facebook_ads, ad_type: :industry)
                           .order(id: :desc)
                           .page(params[:page])
  end

  def new
    @industries = Industry.includes(ad_types: :themes)
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def create
    @scene_collection = current_user.scene_collections.build(scene_collection_params)
    authorize @scene_collection

    if @scene_collection.save
      @scene_collection.create_scene_contents_from_theme

      respond_to do |format|
        format.html { redirect_to targeting_scene_collection_url(@scene_collection) }
        format.json { render :show }
      end
    else
      respond_to do |format|
        format.html { redirect_to root_path, error: 'Scene collection could not be created.' }
        format.json { render :show }
      end
    end
  end

  def update
    if @scene_collection.update(scene_collection_params)
      respond_to do |format|
        format.json { render :show }
      end

    else
      respond_to do |format|
        format.json { render_json_model_errors(@scene_collection) }
      end
    end
  end

  def summary_info
    respond_to do |format|
      format.json
    end
  end

  private

  def load_scene_collection
    @scene_collection = SceneCollection.find(params[:id])
    authorize @scene_collection
  end

  def scene_collection_params
    if params[:scene_collection]
      params.require(:scene_collection).permit(
        :theme_id, :ad_type_id, :color, :font_id, :song_id, :aspect_ratio, :audio, :integration,
        facebook_targeting_spec_ids: [], zip_codes: []
      ).tap do |whitelisted|
        whitelisted[:integration_data] = params[:scene_collection][:integration_data]
      end
    else
      {}
    end
  end
end
