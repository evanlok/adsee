class Admin::IndustriesController < Admin::BaseController
  before_action :load_industry, only: [:edit, :update, :destroy]

  def index
    @industries = Industry.order(:name).page(params[:page])
  end

  def new
    @industry = Industry.new
  end

  def create
    @industry = Industry.new(industry_params)

    if @industry.save
      redirect_to edit_admin_industry_url(@industry), notice: "Created Industry: #{@industry.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @industry.update(industry_params)
      redirect_to edit_admin_industry_url(@industry), notice: "Updated Industry: #{@industry.name}"
    else
      render :edit
    end
  end

  def destroy
    @industry.destroy
    redirect_to admin_industries_url, notice: "Deleted Industry: #{@industry.name}"
  end

  private

  def load_industry
    @industry = Industry.find(params[:id])
  end

  def industry_params
    params.require(:industry).permit!
  end
end
