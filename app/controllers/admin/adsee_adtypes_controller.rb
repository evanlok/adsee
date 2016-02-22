class Admin::AdseeAdtypesController < Admin::BaseController
  before_action :load_adsee_adtype, only: [:edit, :update, :destroy]

  def index
    @adsee_adtypes = AdseeAdtype.includes(:industry).order(:name).page(params[:page])
  end

  def new
    @adsee_adtype = AdseeAdtype.new
  end

  def create
    @adsee_adtype = AdseeAdtype.new(adsee_adtype_params)

    if @adsee_adtype.save
      redirect_to edit_admin_adsee_adtype_url(@adsee_adtype), notice: "Created Adtype: #{@adsee_adtype.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @adsee_adtype.update(adsee_adtype_params)
      redirect_to edit_admin_adsee_adtype(@adsee_adtype), notice: "Updated Adtype: #{@adsee_adtype.name}"
    else
      render :edit
    end
  end

  def destroy
    @adsee_adtype.destroy
    redirect_to admin_adsee_adtypes_url, notice: "Deleted Adtype: #{@adsee_adtype.name}"
  end

  private

  def load_adsee_adtype
    @adsee_adtype = AdseeAdtype.find(params[:id])
  end

  def adsee_adtype_params
    params.require(:adsee_adtype).permit!
  end
end
