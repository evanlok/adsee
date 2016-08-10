class Admin::ThemeVariantsController < Admin::BaseController
  before_action :load_theme_variant, only: [:edit, :update, :destroy]

  def index
    @theme_variants = ThemeVariant.includes(:theme, :video_type, :scenes).order('themes.name, theme_variants.position')
                        .page(params[:page])
  end

  def new
    @theme_variant = ThemeVariant.new
    js :edit
  end

  def create
    @theme_variant = ThemeVariant.new(theme_variant_params)

    if @theme_variant.save
      redirect_to edit_admin_theme_variant_url(@theme_variant),
                  notice: "Created Theme Variant: #{@theme_variant.display_name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @theme_variant.update(theme_variant_params)
      redirect_to edit_admin_theme_variant_url(@theme_variant),
                  notice: "Updated Theme Variant: #{@theme_variant.display_name}"
    else
      render :edit
    end
  end

  def destroy
    @theme_variant.destroy
    redirect_to admin_theme_variants_url, notice: "Deleted Theme Variant: #{@theme_variant.name}"
  end

  private

  def load_theme_variant
    @theme_variant = ThemeVariant.find(params[:id])
  end

  def theme_variant_params
    params.require(:theme_variant).permit!
  end
end
