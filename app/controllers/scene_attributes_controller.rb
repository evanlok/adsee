class SceneAttributesController < ApplicationController
  after_action :verify_authorized
  rescue_from SceneAttribute::SceneAttributeError, with: :scene_attribute_error

  def create
    @scene_content = SceneContent.find(params[:scene_content_id])
    authorize @scene_content

    @scene_attribute = SceneAttribute.from_type(params[:scene_attribute][:type]).new(scene_attribute_params)
    @scene_attribute.scene_content = @scene_content
    authorize @scene_attribute

    if @scene_attribute.save
      respond_to do |format|
        format.json
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@scene_attribute) }
      end
    end
  end

  def update
    @scene_attribute = SceneAttribute.find(params[:id])
    authorize @scene_attribute

    if @scene_attribute.update(scene_attribute_params)
      respond_to do |format|
        format.json
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@scene_attribute) }
      end
    end
  end

  private

  def scene_attribute_params
    params.require(:scene_attribute).permit(:name, :value).tap do |whitelisted|
      whitelisted[:config] = params[:scene_attribute][:config] if params[:scene_attribute][:config]
    end
  end

  def scene_attribute_error(ex)
    respond_to do |format|
      format.json { render json: { errors: [ex.message] }, status: :unprocessable_entity }
    end
  end
end
