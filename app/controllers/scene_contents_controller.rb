class SceneContentsController < ApplicationController
  before_action :load_scene_collection, only: [:index, :create]
  before_action :load_scene_content, except: [:index, :create]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @scene_contents = policy_scope(@scene_collection.scene_contents.includes(:scene, :scene_attributes))

    respond_to do |format|
      format.json
    end
  end

  def create
    @scene_content = @scene_collection.scene_contents.build(scene_content_params)
    authorize @scene_content

    respond_to do |format|
      format.json do
        if @scene_content.save
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
    params.require(:scene_content).permit(:scene_id, :position, :transition_id, :transition_duration)
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
