class Admin::AdTypesController < Admin::BaseController
  before_action :load_ad_type, only: [:edit, :update, :destroy]

  def index
    @ad_types = AdType.includes(:industry).order(:name).page(params[:page])
  end

  def new
    @ad_type = AdType.new
  end

  def create
    @ad_type = AdType.new(ad_type_params)

    if @ad_type.save
      redirect_to edit_admin_ad_type_url(@ad_type), notice: "Created Ad Type: #{@ad_type.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @ad_type.update(ad_type_params)
      redirect_to edit_admin_ad_type(@ad_type), notice: "Updated Ad Type: #{@ad_type.name}"
    else
      render :edit
    end
  end

  def destroy
    @ad_type.destroy
    redirect_to admin_ad_types_url, notice: "Deleted Ad Type: #{@ad_type.name}"
  end

  private

  def load_ad_type
    @ad_type = AdType.find(params[:id])
  end

  def ad_type_params
    params.require(:ad_type).permit!
  end
end
