class ThemesController < ApplicationController
  def index
    @themes = Theme.includes(:theme_variants, :song, :font, ad_type: :industry).page(params[:page]).per(50)

    if params[:ad_type_id].present?
      ad_type = AdType.find(params[:ad_type_id])
      @themes = @themes.where(ad_type: ad_type)
    end

    if params[:industry_id].present?
      industry = Industry.find(params[:industry_id])
      @themes = @themes.joins(ad_type: :industry).where(industries: { id: industry })
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
