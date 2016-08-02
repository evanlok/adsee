class ThemesController < ApplicationController
  def index
    @ad_type = AdType.find(params[:ad_type_id])
    @themes = @ad_type.themes

    respond_to do |format|
      format.html
      format.json
    end
  end

  def show
    @theme = Theme.find(params[:id])
    @theme_variant = @theme.theme_variants.default
  end
end
