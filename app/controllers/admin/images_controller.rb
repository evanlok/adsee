class Admin::ImagesController < Admin::BaseController
  def index
    @images = Image.where(user_id: nil).order(id: :desc).page(params[:page])
  end

  def create
    @image = Image.new(image_params)

    if @image.save
      respond_to do |format|
        format.json { render json: @image, status: :created }
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@image) }
      end
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy

    redirect_to admin_images_url, notice: "Image deleted: #{@image.filename}"
  end

  private

  def image_params
    params.require(:image).permit(:filename, :original_path, :path, :thumbnail_path, :file_size, :filestack_url)
  end
end
