class SceneContentsController < ApplicationController
  before_action :load_scene_collection, only: [:index, :create]
  before_action :load_scene_content, except: [:index, :create]

  def index
    @scene_contents = policy_scope(@scene_collection.scene_contents.includes(:scene))

    respond_to do |format|
      format.json
    end
  end

  def create
    @scene_collection.scene_contents.build(scene_content_params)

    respond_to do |format|
      format.json do
        if @scene_collection.save
          render :show
        else
          render_json_model_errors(@scene_content)
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def update
    respond_to do |format|
      format.json do
        if @scene_content.update(scene_content_params)
          render :show
        else
          render_json_model_errors(@scene_content)
        end
      end
    end
  end

  def destroy
    @scene_content.destroy

    respond_to do |format|
      format.json { render :show }
    end
  end

  private

  def scene_content_params
    params.require(:scene_content).permit(:scene_id, :position, :transition, :transition_duration)
  end

  def load_scene_content
    @scene_content = SceneContent.find(params[:id])
    authorize @scene_content
  end

  def load_scene_collection
    @scene_collection = SceneCollection.find(params[:scene_collection_id])
    authorize @scene_collection, :show?
  end
end
