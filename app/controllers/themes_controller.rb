class ThemesController < ApplicationController
  def index
    @themes = Theme.page(params[:page]).per(50)

    if params[:ad_type_id].present?
      ad_type = AdType.find(params[:ad_type_id])
      @themes = @themes.where(ad_type: ad_type)
    end

    @themes = @themes.featured if params[:featured] == '1'

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
