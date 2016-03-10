class Admin::ThemesController < Admin::BaseController
  before_action :load_theme, only: [:edit, :update, :destroy]

  def index
    @themes = Theme.includes(theme_variants: :video_type).order(:name).page(params[:page])
  end

  def new
    @theme = Theme.new
    js :edit
  end

  def create
    @theme = Theme.new(theme_params)

    if @theme.save
      redirect_to edit_admin_theme_url(@theme), notice: "Created Theme: #{@theme.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @theme.update(theme_params)
      redirect_to edit_admin_theme_url(@theme), notice: "Updated Theme: #{@theme.name}"
    else
      render :edit
    end
  end

  def destroy
    @theme.destroy
    redirect_to admin_themes_url, notice: "Deleted Theme: #{@theme.name}"
  end

  private

  def load_theme
    @theme = Theme.find(params[:id])
  end

  def theme_params
    params.require(:theme).permit!
  end
end
