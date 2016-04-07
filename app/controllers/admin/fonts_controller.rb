class Admin::FontsController < Admin::BaseController
  before_action :load_font, only: [:edit, :update, :destroy]

  def index
    @fonts = Font.order(:name).page(params[:page])
  end

  def new
    @font = Font.new
  end

  def create
    @font = Font.new(font_params)

    if @font.save
      redirect_to edit_admin_font_url(@font), notice: "Created font: #{@font.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @font.save
      redirect_to edit_admin_font_url(@font), notice: "Updated font: #{@font.name}"
    else
      render :edit
    end
  end

  def destroy
    @font.destroy
    redirect_to admin_fonts_url, notice: "Deleted font: #{@font.name}"
  end

  private

  def load_font
    @font = Font.find(params[:id])
  end

  def font_params
    params.require(:font).permit!
  end
end
