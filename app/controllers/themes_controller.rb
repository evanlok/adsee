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

  def recommended
    ad_type = AdType.find(params[:ad_type_id])
    facebook_targeting_spec = FacebookTargetingSpec.find(params[:facebook_targeting_spec_id])
    conditions = {
      theme_recommendation_groups: {
        ad_type_id: ad_type,
        facebook_targeting_spec_id: facebook_targeting_spec
      }
    }
    @themes = Theme.joins(:theme_recommendation_groups).where(conditions)

    respond_to do |format|
      format.json { render :index }
    end
  rescue ActiveRecord::RecordNotFound => e
    render_json_record_not_found(e)
  end
end
