class Admin::ThemeRecommendationsController < Admin::BaseController
  before_action :load_theme_recommendation, only: [:show, :update, :destroy]

  def index
    @theme_recommendations = ThemeRecommendation.includes(ad_type: :industry).joins(:facebook_targeting_spec, :theme)
                               .order('industries.name, ad_types.name, facebook_targeting_specs.name, themes.name')
                               .page(params[:page]).per(50)
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def new
  end

  def create
    @theme_recommendation = ThemeRecommendation.new(theme_recommendation_params)

    if @theme_recommendation.save
      respond_to do |format|
        format.json { render :show, status: :created }
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@theme_recommendation) }
      end
    end
  end

  def edit
  end

  def update
    if @theme_recommendation.update(theme_recommendation_params)
      respond_to do |format|
        format.json { render :show, status: :created }
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@theme_recommendation) }
      end
    end
  end

  def destroy
    @theme_recommendation.destroy
  end

  def available_themes
    ad_type = AdType.find(params[:ad_type_id])
    facebook_targeting_spec = FacebookTargetingSpec.find(params[:facebook_targeting_spec_id])
    unavailable_ids = ThemeRecommendation.where(ad_type: ad_type, facebook_targeting_spec: facebook_targeting_spec)
                        .pluck(:theme_id)
    @themes = ad_type.themes.where.not(id: unavailable_ids)

    respond_to do |format|
      format.json
    end
  end

  private

  def load_theme_recommendation
    @theme_recommendation = ThemeRecommendation.find(params[:id])
  end

  def theme_recommendation_params
    params.require(:theme_recommendation).permit!
  end
end
