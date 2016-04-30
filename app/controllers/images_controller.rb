class ImagesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @images = policy_scope(Image).order(created_at: :desc).page(params[:page]).per(50)

    respond_to do |format|
      format.json
    end
  end

  def create
    @image = current_user.images.build(image_params)
    authorize @image

    if @image.save
      respond_to do |format|
        format.json
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@image) }
      end
    end
  end

  def destroy
    @image = Image.find(params[:id])
    authorize @image
    @image.destroy

    respond_to do |format|
      format.json
    end
  end

  private

  def image_params
    params.require(:image).permit(:filename, :original_path, :path, :thumbnail_path, :file_size, :filestack_url)
  end
end
