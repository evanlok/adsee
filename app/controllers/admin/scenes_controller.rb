class Admin::ScenesController < Admin::BaseController
  before_action :load_scene, except: [:index, :tags]

  def index
    @scenes = Scene.includes(:tags).page(params[:page])
  end

  def edit
  end

  def update
    attributes = scene_attributes
    attributes[:tag_list] = attributes.delete(:tags).reject(&:blank?).join(',') if attributes[:tags]

    if @scene.update(attributes)
      redirect_to edit_admin_scene_url(@scene), notice: "Updated scene: #{@scene.name}"
    else
      render :edit
    end
  end

  def destroy
    @scene.destroy
    redirect_to admin_scenes_url, notice: "Deleted scene: #{@scene.name}"
  end

  def tags
    @tags = ActsAsTaggableOn::Tag.joins(:taggings).where(taggings: { taggable_type: 'Scene' }).where('tags.name ilike ?', "%#{params[:q]}%").page(params[:page])

    respond_to do |format|
      format.json do
        render json: @tags.map { |tag| { id: tag.name, text: tag.name } }
      end
    end
  end

  private

  def load_scene
    @scene = Scene.find(params[:id])
  end

  def scene_attributes
    params.require(:scene).permit!
  end
end
