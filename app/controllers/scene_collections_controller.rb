class SceneCollectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_scene_collection, only: [:edit, :update]
  after_action :verify_authorized

  def create
    @scene_collection = current_user.scene_collections.build(scene_collection_params)
    authorize @scene_collection

    if @scene_collection.save
      @scene_collection.create_scene_contents_from_theme
      redirect_to edit_scene_collection_url(@scene_collection)
    else
      redirect_to root_path, error: 'Scene collection could not be created.'
    end
  end

  def edit
  end

  def update
    if @scene_collection.update(scene_collection_params)
      redirect_to edit_scene_collection_url(@scene_collection)
    else
      render :edit
    end
  end

  private

  def load_scene_collection
    @scene_collection = SceneCollection.find(params[:id])
    authorize @scene_collection
  end

  def scene_collection_params
    params.require(:scene_collection).permit(:theme_id, :ad_type_id, :color, :font_id, :song_id)
  end
end
