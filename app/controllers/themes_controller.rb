class ThemesController < ApplicationController
  def index
    @ad_type = AdType.find(params[:ad_type_id])
    @themes = @ad_type.themes
  end

  def show
    @theme = Theme.find(params[:id])
    @theme_variant = @theme.theme_variants.default
  end
end
