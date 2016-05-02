class SceneCollectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_scene_collection, only: [:show, :update]
  after_action :verify_authorized, except: :new

  wrap_parameters include: [*SceneCollection.attribute_names, :facebook_targeting_spec_ids]

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
      redirect_to targeting_scene_collection_url(@scene_collection)
    else
      redirect_to root_path, error: 'Scene collection could not be created.'
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

  private

  def load_scene_collection
    @scene_collection = SceneCollection.find(params[:id])
    authorize @scene_collection
  end

  def scene_collection_params
    if params[:scene_collection]
      params.require(:scene_collection).permit(
        :theme_id, :ad_type_id, :color, :font_id, :song_id, facebook_targeting_spec_ids: [], zip_codes: []
      )
    else
      {}
    end
  end
end
